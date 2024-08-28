import { Sprite } from "./sprite";

export type Position = {
  x: number;
  y: number;
};

export type GameObject = {
  clientId?: string,
  render: (ctx: CanvasRenderingContext2D) => void;
  setPosition: (position: Position) => void;
  getPosition: () => Position;
  setSpeed: (speed: number) => void;
  getSpeed: () => number;
  setDir: (dir: number) => void;
  sprite: Sprite;
};