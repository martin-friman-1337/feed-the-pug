import { createGameObject } from "../game-object";
import { createSprite } from "../sprite";
import { GameObject, Position } from "../types/game-object";

export const createPug = (position: Position) => {
  let pug: GameObject;
  let speed = 0;
  let dir = 1;
  let stillTime = 1000;

  const runSprite = createSprite("./sprites/pug-run.png", 16, 16, 3, 80);
  const runningPug = createGameObject(runSprite);
  runningPug.setPosition(position);

  const stillSprite = createSprite("./sprites/pug-still.png", 16, 16, 2, 200);
  const stillPug = createGameObject(stillSprite);
  stillPug.setPosition(position);

  const sittingPug = createGameObject(
    createSprite("./sprites/pug-sit.png", 16, 16, 2, 400)
  );
  sittingPug.setPosition(position);

  const setSpeed = (newSpeed: number) => {
    speed = newSpeed;

    if (Math.abs(speed) > 0) {
      pug = runningPug;
    }

    if (speed === 0) {
      pug = stillPug;
    }
    if (speed !== 0) dir = speed > 0 ? 1 : -1;
  };

  const getSpeed = () => {
    return speed;
  };

  const render = (ctx: CanvasRenderingContext2D) => {
    if (speed !== 0) {
      stillTime = 0;
    } else {
      stillTime += 1;
    }

    if (stillTime > 100) {
      pug = sittingPug;
    }

    if (pug) {
      pug.setDir(dir);
      pug.render(ctx);
    }
  };

  const getPosition = () => {
    if (!pug) return { x: 0, y: 0 };
    return pug.getPosition();
  };

  return {
    setSpeed,
    getSpeed,
    render,
    getPosition,
  };
};
