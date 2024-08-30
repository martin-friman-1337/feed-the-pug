import { GameObject, Position } from "../types/game-object";
import { Sprite } from "../types/sprite";

export const createGameObject = (
  sprite: Sprite,
  speed = 0,
  position: Position = { x: 0, y: 0 }
): GameObject => {
  let dir = 0;

  const setPosition = (newPosition: Position) => {
    position = newPosition;
  };

  const getPosition = () => position;

  const setSpeed = (newSpeed: number) => {
    speed = newSpeed;
  };

  const getSpeed = () => speed;

  const setDir = (newDir: number) => {
    dir = newDir;
  };

  const render = (ctx: CanvasRenderingContext2D) => {
    ctx.save();  
    ctx.translate(
      Math.floor(position.x + (dir === 1 ? sprite.width : 0)),
      Math.floor(position.y)
    );
    ctx.scale(dir === 1 ? -1 : 1, 1);
    ctx.drawImage(
      sprite.image,
      sprite.getCurrentFrame() * sprite.width,
      0,
      sprite.width,
      sprite.height,
      0,
      0,
      sprite.width,
      sprite.height
    );

    ctx.restore();

    if (!sprite.animate) return;

    const now = Date.now();
    if (now - sprite.lastUpdate > sprite.delay) {
      sprite.setCurrentFrame((sprite.getCurrentFrame() + 1) % sprite.numFrames);
      sprite.lastUpdate = now;
    }
  
}

  return {
    render,
    setPosition,
    getPosition,
    setSpeed,
    getSpeed,
    setDir,
    sprite,
  };
};
