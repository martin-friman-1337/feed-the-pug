import { createGameObject } from "./game-object/object";
import { createSprite } from "./game-object/sprite";
import createTracker from "./hand-tracking/tracker";
import { createLevel } from "./level";
import { createPug } from "./pug/pug";
import { fetchInitialGameState } from "./stores/gameState";
import { createTreats } from "./treats";
import { GameObject } from "./types/game-object";
import { IMovePlayerPugPosition } from "./events-manager/action-types/pug";
import { socket } from "./socketio-client";


export const getCtx = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;
  return ctx;
};

const initGame = async (canvas: HTMLCanvasElement) => {
  const ctx = getCtx(canvas);
    //tell the server we're spawning -- this is a temp solution. in reality, the client should "request to spawn, and get a spawn location returned to it"
    socket.emit("clientBroascastInitialLocation",{position: {x:Math.floor(canvas.width / 2) - 8, y: 286}, speed:0, direction:1} as IMovePlayerPugPosition ); 
  await fetchInitialGameState();
  const tracker = await createTracker();

  const treats = createTreats();
  let treatToPick: GameObject | null = null;


  const pug = createPug({
    x: Math.floor(canvas.width / 2) - 8,
    y: 286,
  });

 
  const level = createLevel();

  const hand = createGameObject(
    createSprite("./sprites/hand.png", 24, 24, 3, 100, 2, 0, false)
  );
  const update = () => {
    treats.update(pug);
    const speed = pug.getSpeed();
      
    const pointingFingerPosition = tracker.getPointingFingerPosition();

    hand.setPosition({
      x: canvas.width * pointingFingerPosition.x,
      y: canvas.height * pointingFingerPosition.y,
    });
    if (tracker.isPicking()) {
      hand.sprite.setCurrentFrame(0);
    } else {
      hand.sprite.setCurrentFrame(1);
    }

    if (tracker.isPicking()) {
      treatToPick =
        treats.getTreats().find((treat) => {
          const distanceToTreat = Math.sqrt(
            (hand.getPosition().x - treat.getPosition().x) ** 2 +
              (hand.getPosition().y - treat.getPosition().y) ** 2
          );

          return distanceToTreat < 50;
        }) || null;

      if (treatToPick) {
        treatToPick.setPosition({
          x: hand.getPosition().x,
          y: hand.getPosition().y + 14,
        });
      }
    }

    if (!tracker.isPicking()) {
    }
    treats.getTreats().forEach((treat) => {
      const distanceToTreat = Math.sqrt(
        (pug.getPosition().x - treat.getPosition().x) ** 2 +
          (pug.getPosition().y - treat.getPosition().y) ** 2
      );

      if (distanceToTreat < 50) {
        const xDist = treat.getPosition().x - pug.getPosition().x;
        const yDist = treat.getPosition().y - pug.getPosition().y;
        pug.jump(yDist < 0 && yDist > -20 && Math.abs(xDist) < 10);

        pug.setSpeed(xDist / 10);
      }

      // Maybe the pug shuld eat the treat if it is close enough?

       if (distanceToTreat < 10) {
        pug.jump(false);// reset jumping animation
        pug.setSpeed(0); // this was causing issues wihh the treats. not sure why
        treats.setTreats(treats.getTreats().filter((t) => t !== treat));
        treatToPick = null;
      } 
    });



    let newSpeed = pug.getSpeed() * 0.95;
    
    if (Math.abs(newSpeed) < 0.2) newSpeed = 0;
    pug.setSpeed(newSpeed);
    level.setSpeed(speed / 2);
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    level.render(ctx);
    
    // Render our player's pug
    pug.render(ctx);
  
    // Render text above your pug
    ctx.font = "12px mono";
    ctx.fillText("your pug", pug.getPosition().x - 10, pug.getPosition().y);
  
    // Render treats and hand
    treats.render(ctx);
    hand.render(ctx);
  };
  


  const loop = () => {
    setTimeout(() => {
      update();
      draw();
      requestAnimationFrame(loop);
    }, 1000 / 60);
  };

  loop();
};





export { initGame };
