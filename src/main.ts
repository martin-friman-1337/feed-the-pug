import { initGame } from "./game";

const app = document.getElementById("app");
if (app) {
  const canvas = document.createElement("canvas");

  canvas.width = (window.innerWidth / 5) * devicePixelRatio;
  canvas.height = (window.innerHeight / 5) * devicePixelRatio;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  canvas.style.imageRendering = "pixelated";

  app.append(canvas);

  initGame(canvas);
}
