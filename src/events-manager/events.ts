import { socket } from "../socketio-client";
import { updateGameState } from "../stores/gameState";
import { GameState } from "../types/game-state";

export function registerEventListeners (){
    // Handle previous connection data
    socket.on('confirmedUpdateToGameState', (newGameState: GameState) => {
        updateGameState(newGameState);
    });

    }
