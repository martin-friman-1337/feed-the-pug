import { createGameObject } from "./game-object";
import { createSprite } from "./sprite";
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
