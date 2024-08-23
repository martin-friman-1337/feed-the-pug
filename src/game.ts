import { createGameObject } from "./game-object/object";
import { createSprite } from "./game-object/sprite";
import { createLevel } from "./level";
import { createPug } from "./pug/pug";

const getCtx = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;

  return ctx;
};

const initGame = (canvas: HTMLCanvasElement) => {
  const ctx = getCtx(canvas);

  const mousePosition = {
    x: 0,
    y: 0,
  };

  const handleMouseMove = (event: MouseEvent) => {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
  };

  canvas.addEventListener("mousemove", handleMouseMove);

  const pug = createPug({
    x: Math.floor(canvas.width / 2) - 8,
    y: 286,
  });

  const level = createLevel();

  const bone = createGameObject(
    createSprite("./sprites/bone.png", 15, 7, 1, 100)
  );

  const update = () => {
    bone.setPosition({
      x:
        (canvas.width * mousePosition.x) / window.innerWidth -
        bone.sprite.width / 2,
      y: (canvas.height * mousePosition.y) / window.innerHeight,
    });

    const speed = pug.getSpeed();

    const distanceToBone = Math.sqrt(
      (pug.getPosition().x - bone.getPosition().x) ** 2 +
        (pug.getPosition().y - bone.getPosition().y) ** 2
    );

    if (distanceToBone < 50) {
      const xDist = bone.getPosition().x - pug.getPosition().x;
      const yDist = bone.getPosition().y - pug.getPosition().y;

      pug.jump(yDist < 0 && yDist > -20 && Math.abs(xDist) < 10);

      pug.setSpeed(xDist / 10);
    }

    let newSpeed = pug.getSpeed() * 0.95;

    if (Math.abs(newSpeed) < 0.2) newSpeed = 0;

    pug.setSpeed(newSpeed);
    level.setSpeed(speed);
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    level.render(ctx);
    pug.render(ctx);
    bone.render(ctx);
  };

  const loop = () => {
    update();
    draw();

    requestAnimationFrame(loop);
  };

  loop();
};

export { initGame };
