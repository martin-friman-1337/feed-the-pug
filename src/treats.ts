import { createGameObject } from "./game-object/object";
import { createSprite } from "./game-object/sprite";
import { GameObject } from "./types/game-object";
import { Pug } from "./types/pug";

let treats: GameObject[] = [
  createGameObject(createSprite("./sprites/ham.png", 16, 16, 1, 100), 5, {
    x: Math.random() * 640,
    y: 100,
  }),

  createGameObject(createSprite("./sprites/bone.png", 15, 7, 1, 100), 5, {
    x: Math.random() * 640,
    y: 0,
  }),
  createGameObject(createSprite("./sprites/ham.png", 16, 16, 1, 100), 5, {
    x: Math.random() * 640,
    y: 100,
  }),

  createGameObject(createSprite("./sprites/bone.png", 15, 7, 1, 100), 5, {
    x: Math.random() * 640,
    y: 0,
  }),
];

export const createTreats = () => {
  const update = (pug: Pug) => {
    treats.forEach((treat) => {
      const yPos =
        treat.getPosition().y < 290
          ? treat.getPosition().y + treat.getSpeed()
          : 300 - treat.sprite.height / 2;

      treat.setPosition({
        x: treat.getPosition().x,
        y: yPos,
      });
    });
  };

  const render = (ctx: CanvasRenderingContext2D) => {
    treats.forEach((treat) => {
      treat.render(ctx);
    });
  };

  const getTreats = () => treats;

  const setTreats = (newTreats: GameObject[]) => {
    treats = newTreats;
  };

  return {
    setTreats,
    getTreats,
    update,
    render,
  };
};
