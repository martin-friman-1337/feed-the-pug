import { createGameObject } from "./game-object/object";
import { createSprite } from "./game-object/sprite";
import { getOtherPlayersFromClientStore, getPoopFromClientStore } from "./stores/gameState";
import { GameObject } from "./types/game-object";

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

  let turds: GameObject[] = [];
  getPoopFromClientStore().forEach(poop =>{
    const turd = createGameObject(
      createSprite("./sprites/turd.png", 16, 16, 7, 100)
    );
    turd.setPosition({
      x: poop.position.x,
      y: poop.position.y,
    });
    turds.push(turd);
  });

  const stillSprite = createSprite("./sprites/pug-still.png", 16, 16, 2, 200);
  const stillPug = createGameObject(stillSprite);
  let otherPugs: GameObject[] = [];

  getOtherPlayersFromClientStore().forEach(player =>{
    const puggo = stillPug;
    puggo.setSpeed(player.pug.speed!);
    puggo.setDir(player.pug.dir!);
    puggo.setPosition({
      x: player.pug.position.x,
      y: player.pug.position.y,
    });
    otherPugs.push(puggo);
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
      x: dogHouse.getPosition().x - speed,
      y: dogHouse.getPosition().y,
    });

    dogHouse.render(ctx);

    turds.forEach(t =>{
      t.setPosition({
        x: t.getPosition().x - speed,
        y: t.getPosition().y,
      });
      t.render(ctx)
    })

    otherPugs.forEach(op =>{
      op.setPosition({
        x: op.getPosition().x - speed,
        y: op.getPosition().y,
      });
      op.render(ctx)
    })

    groundObjects.forEach((ground) => {
      ground.setPosition({
        x: ground.getPosition().x - speed,
        y: ground.getPosition().y,
      });
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
