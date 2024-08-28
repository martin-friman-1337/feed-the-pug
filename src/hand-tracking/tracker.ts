import {
  FilesetResolver,
  HandLandmarker,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision";
import { Position } from "../types/game-object";

export default async function createTracker() {
  const video = document.createElement("video");

  video.style.position = "fixed";
  video.style.objectFit = "fill";
  video.style.zIndex = "-1";
  video.style.width = window.innerWidth + "px";
  video.style.height = window.innerHeight + "px";
  video.style.left = "0";
  video.style.right = "0";
  video.style.top = "0";
  video.style.bottom = "0";
  video.style.transform = "scale(-1,1)";
  video.style.opacity = "0.2";

  document.body.append(video);

  video.autoplay = true;
  video.width = 640;
  video.height = 480;

  let landmarks: NormalizedLandmark[][] = [];

  let mousePosition: Position = { x: 0, y: 0 };
  let mousePress = false;

  document.addEventListener("mousemove", (event) => {
    mousePosition.x = event.clientX / window.innerWidth;
    mousePosition.y = event.clientY / window.innerHeight;
  });

  document.addEventListener("mousedown", () => {
    mousePress = true;
  });

  document.addEventListener("mouseup", () => {
    mousePress = false;
  });

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  if (video) {
    video.srcObject = stream;
  }

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  const handLandmarker = await HandLandmarker.createFromOptions(vision, {
    runningMode: "VIDEO",
    baseOptions: {
      modelAssetPath: "models/hand_landmarker.task",
    },
    numHands: 2,
  });

  const loop = () => {
    const detections = handLandmarker.detectForVideo(video, Date.now());
    landmarks = detections.landmarks;

    requestAnimationFrame(loop);
  };

  loop();

  const getPointingFingerPosition = (): Position => {
    //    return mousePosition;

    if (!landmarks[0]) return { x: 0, y: 0 };

    const pointing = landmarks[0][8];
    const thumb = landmarks[0][4];

    const x = 1 - 0.5 * (pointing.x + thumb.x);
    const y = 0.5 * (pointing.y + thumb.y);

    return {
      x,
      y,
    };
  };

  const isPicking = () => {
    //return mousePress;
    if (!landmarks[0]) return false;

    const pointing = landmarks[0][8];
    const thumb = landmarks[0][4];

    const distance = Math.sqrt(
      (pointing.x - thumb.x) ** 2 + (pointing.y - thumb.y) ** 2
    );

    const minDist = 0.05;
    return distance < minDist;
  };

  return {
    getPointingFingerPosition,
    isPicking,
  };
}
