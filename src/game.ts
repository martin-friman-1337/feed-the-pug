import { createGameObject } from "./game-object";
import { createLevel } from "./level";
import { createPug } from "./pug/pug";
import { createSprite } from "./sprite";

const initGame = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  ctx.imageSmoothingEnabled = false;

  const mousePosition = {
    x: 0,
    y: 0,
  };

  const handleMouseMove = (event: MouseEvent) => {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
  };

  canvas.addEventListener("mousemove", handleMouseMove);

  ctx.imageSmoothingEnabled = false;

  const pugPosition = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };

  // Create the pug
  const pug = createPug({
    x: Math.floor(canvas.width / 2),
    y: canvas.height - 110,
  });

  // Create the level
  const level = createLevel();

  const bone = createGameObject(
    createSprite("./sprites/bone.png", 15, 7, 1, 100)
  );
  bone.setPosition({
    x: 100,
    y: 100,
  });

  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bone.setPosition({
      x:
        (canvas.width * mousePosition.x) / window.innerWidth -
        bone.sprite.width / 2,
      y: (canvas.height * mousePosition.y) / window.innerHeight,
    });

    const speed = pug.getSpeed();
    pugPosition.x -= speed;

    const distanceToBone = Math.sqrt(
      (pug.getPosition().x - bone.getPosition().x) ** 2 +
        (pug.getPosition().y - bone.getPosition().y) ** 2
    );

    if (distanceToBone < 50) {
      const xDist = bone.getPosition().x - pug.getPosition().x;
      const yDist = bone.getPosition().y - pug.getPosition().y;

      if (yDist < 0 && yDist > -20 && Math.abs(xDist) < 10) {
        console.log("jump");
        pug.jump(true);
      } else {
        pug.jump(false);
      }
      pug.setSpeed(xDist / 10);
    }

    let newSpeed = pug.getSpeed() * 0.95;

    if (Math.abs(newSpeed) < 0.2) newSpeed = 0;

    pug.setSpeed(newSpeed);

    // console.log(distanceToBone);

    level.setSpeed(speed);

    level.render(ctx);
    pug.render(ctx);
    bone.render(ctx);

    requestAnimationFrame(loop);
  };

  window.addEventListener(
    "keydown",
    (event: KeyboardEvent) => {
      console.log(event.key);

      if (event.key === "ArrowLeft") {
        pug.setSpeed(-2);
      } else if (event.key === "ArrowRight") {
        pug.setSpeed(2);
      }
    },
    false
  );

  window.addEventListener("keyup", (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      pug.setSpeed(0);
    }
  });

  loop();
};

export { initGame };
