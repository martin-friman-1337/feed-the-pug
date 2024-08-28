import { Position } from "./game-object";

export type Pug = {
  setSpeed: (newSpeed: number) => void;
  getSpeed: () => number;
  render: (ctx: CanvasRenderingContext2D) => void;
  getPosition: () => Position;
  jump: (shouldJump: boolean) => void;
};
