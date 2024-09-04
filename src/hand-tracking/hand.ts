import { createGameObject } from "../game-object/object";
import { createSprite } from "../game-object/sprite";
import { GameObject, Position } from "../types/game-object";

export const createHand = (position: Position) => {
  let pickingObject: GameObject | null = null;

  const hand = createGameObject(
    createSprite("./sprites/hand.png", 24, 24, 3, 100, 2, 0, false)
  );
  hand.setPosition(position);

  return hand;
};
