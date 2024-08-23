import { createGameObject } from "./game-object/object";
import { createSprite } from "./game-object/sprite";
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

  const turd = createGameObject(
    createSprite("./sprites/turd.png", 16, 16, 7, 100)
  );
  turd.setPosition({
    x: 200,
    y: 286,
  });

  const coin = createGameObject(
    createSprite("./sprites/coin.png", 8, 8, 8, 100)
  );
  coin.setPosition({
    x: 300,
    y: 286,
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

    turd.setPosition({
      x: turd.getPosition().x - speed,
      y: turd.getPosition().y,
    });
    turd.render(ctx);

    coin.setPosition({
      x: coin.getPosition().x - speed,
      y: coin.getPosition().y,
    });
    coin.render(ctx);

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
