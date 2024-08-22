export type Sprite = {
  image: HTMLImageElement;
  width: number;
  height: number;
  numFrames: number;
  delay: number;
  lastUpdate: number;
  currentFrame: number;
};
