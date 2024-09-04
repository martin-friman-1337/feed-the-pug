import { createGameObject } from "./game-object/object";
import { createSprite } from "./game-object/sprite";
import { getOtherPlayersFromClientStore, getPlayerGameStateByClientId, getPoopFromClientStore } from "./stores/gameState";
import { GameObject } from "./types/game-object";

let turds: GameObject[] = [];
let otherPugs: GameObject[] = []; // Initialize an array to store other pugs

export const createLevel = () => {
  const groundSpprite = createSprite("./sprites/ground.png", 144, 17, 1, 100);

  const groundObjects: GameObject[] = [];

  const dogHouse = createGameObject(
    createSprite("./sprites/dog-house.png", 48, 32, 1, 100)
  );
  dogHouse.setPosition({
    x: 100,
    y: 273,
  });
  getPoopFromClientStore().forEach(poop => {
    const turd = createGameObject(
      createSprite("./sprites/turd.png", 16, 16, 7, 100)
    );
    turd.setPosition({
      x: poop.position.x,
      y: poop.position.y,
    });
    turds.push(turd);
  });


  let speed = 0;

  for (let i = 0; i < 10; i++) {
    const ground = createGameObject(groundSpprite);
    ground.setPosition({
      x: i * ground.sprite.width,
      y: 300,
    });
    groundObjects.push(ground);
  }

  const render = (ctx: CanvasRenderingContext2D) => {
    dogHouse.setPosition({
      x: dogHouse.getPosition().x,
      y: dogHouse.getPosition().y,
    });

    dogHouse.render(ctx);

    turds.forEach(t => {
      t.setPosition({
        x: t.getPosition().x,
        y: t.getPosition().y,
      });
      t.render(ctx);
    });
  // Initialize other pugs from the client store
  otherPugs = [];
  getOtherPlayersFromClientStore().forEach(player => {
    const pugSprite = player.pug.speed! > 0 ? createSprite("./sprites/pug-run.png", 16, 16, 3, 80) : createSprite("./sprites/pug-still.png", 16, 16, 2, 200);
    const pug = createGameObject(pugSprite);
    pug.setDir(player.pug.dir!)
    pug.setPosition({
      x: player.pug.position.x - speed,
      y: player.pug.position.y,
    });
    pug.clientId = player.playerId;
    otherPugs.push(pug);
  });
    // Render other pugs
    otherPugs.forEach(pug => {
      const currentGameStateForPlayer = getPlayerGameStateByClientId(pug.clientId!);
      console.log(currentGameStateForPlayer?.pug.speed);
      if(!currentGameStateForPlayer) return; //idk, maybe just despawn player?? something went wrong
      pug.setPosition({
        x: currentGameStateForPlayer.pug.position.x - speed,
        y: currentGameStateForPlayer.pug.position.y,
      });
      // Render text above pug
      ctx.font = "12px mono";
      ctx.fillText(pug.clientId!.toString(), pug.getPosition().x - 60, pug.getPosition().y);
      pug.render(ctx);
    });

    groundObjects.forEach(ground => {
      ground.render(ctx);
    });
  };

  const setSpeed = (newSpeed = 0) => {
    speed = newSpeed;
  };

  return {
    render,
    setSpeed,
  };
};
