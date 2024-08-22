import { Sprite } from "./types/sprite";

export const createSprite = (
  src: string,
  width = 0,
  height = 0,
  numFrames = 1,
  delay = 100,
  currentFrame = 1,
  lastUpdate = 0
): Sprite => {
  const image = new Image();
  image.src = src;

  return {
    image,
    width,
    height,
    numFrames,
    delay,
    currentFrame,
    lastUpdate,
  };
};
