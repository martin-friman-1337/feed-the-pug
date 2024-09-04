import { IEatPoop, IEatTreat, IMovePlayerPugPosition } from "../events-manager/action-types/pug";
import { createGameObject } from "../game-object/object";
import { createSprite } from "../game-object/sprite";
import { socket } from "../socketio-client";
import { GameObject, Position } from "../types/game-object";
import { Pug } from "../types/pug";

export const createPug = (initialPosition: Position) => {
  let pug: GameObject;
  let speed = 0;
  let dir = 1;
  let stillTime = 1000;
  let isJumping = false;
  let position = initialPosition;

  const runSprite = createSprite("./sprites/pug-run.png", 16, 16, 3, 80);
  const runningPug = createGameObject(runSprite);
  runningPug.setPosition(position);

  const stillSprite = createSprite("./sprites/pug-still.png", 16, 16, 2, 200);
  const stillPug = createGameObject(stillSprite);
  stillPug.setPosition(position);

  const sittingPug = createGameObject(
    createSprite("./sprites/pug-sit.png", 16, 16, 2, 400)
  );
  sittingPug.setPosition(position);

  const jumpingPug = createGameObject(
    createSprite("sprites/pug-jump.png", 16, 16, 4, 100)
  );
  jumpingPug.setPosition(position);

  const setSpeed = (newSpeed: number) => {
    speed = newSpeed;

    if (Math.abs(speed) > 0) {
      pug = runningPug;
    }

    if (speed === 0) {
      pug = stillPug;
    }
    if (speed !== 0) dir = speed > 0 ? 1 : -1;
  };

  const getSpeed = () => {
    return speed;
  };

  const render = (ctx: CanvasRenderingContext2D) => {
    emitPlayerPugPositionToServer({
      position,
      direction: dir,
      speed: speed,
      playerId: socket.id!,
      actionOrderNumber: 0
    });
    if (isJumping) {
      pug = jumpingPug;
    }

    if (speed !== 0) {
      stillTime = 0;

    } else {
      stillTime += 1;
    }
    if (stillTime > 100) {
      pug = sittingPug;
    }

    if (pug) {
        const newPos = {
          x: position.x + speed,
          y: position.y,
        }
        position = newPos;
        pug.setPosition(newPos);
        
      pug.setDir(dir);
      pug.render(ctx);
      
    }
  };

  const jump = (shouldJump: boolean) => {
    isJumping = shouldJump;
  };

  const getPosition = () => {
    if (!pug) return { x: 0, y: 0 };
    return position;
  };

  const emitPlayerPugPositionToServer = (eventActionData: IMovePlayerPugPosition ) => {
    socket.emit("clientBroadcastPugLocation", {...eventActionData}); 
  }

  const emitPlayerPugEatTreat = (eventActionData: IEatTreat) => {
    socket.emit("broadcastPlayerPugEatTreat", {...eventActionData}); 
  }

  const emitPlayerPugEatPoop = (eventActionData: IEatPoop) => {
    socket.emit("broadcastPlayerPugEatPoop", {...eventActionData}); 
  }


  return {
    setSpeed,
    getSpeed,
    render,
    getPosition,
    jump,
  } as Pug;
};
