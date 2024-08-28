export type Sprite = {
  image: HTMLImageElement;
  width: number;
  height: number;
  numFrames: number;
  delay: number;
  lastUpdate: number;
  getCurrentFrame: () => number;
  setCurrentFrame: (frame: number) => void;
  animate: boolean;
};
