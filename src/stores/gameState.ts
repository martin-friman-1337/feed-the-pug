import { socket } from "../socketio-client";
import { GAME_OBJECT_TYPE, GameState, IPlayer, IPoop, ITreat } from "../types/game-state";

// Initialize the game state
let gameState: GameState = {
    players:[],
    treats: [],
    poop: []
};

// Fetch the initial game state from the server
export async function fetchInitialGameState(): Promise<void> {
    try {
        const res = await fetch('http://localhost:3003/getInitialGameState');
        
        if (!res.ok) {
            throw new Error(`Failed to fetch initial game state: ${res.statusText}`);
        }

        const newGameState: GameState = await res.json();
        updateGameState(newGameState);
    } catch (error) {
        console.error('Error fetching initial game state:', error);
    }
}

// Update the global game state with a new one
export function updateGameState(newGameState: GameState) {
    gameState = newGameState;
}


export function getPlayerGameStateByClientId(clientId: string):IPlayer | undefined {
    return gameState.players.find((player)=> player.playerId == clientId); // return a filtered players list that ignores ourselves
}

// Retrieve other players from the client store
export function getOtherPlayersFromClientStore(): IPlayer[] {
    return gameState.players.filter((player)=> player.playerId != socket.id); // return a filtered players list that ignores ourselves
}

// Retrieve treats from the client store
export function getTreatsFromClientStore(): ITreat[] {
    return gameState.treats;
}

// Retrieve poop from the client store
export function getPoopFromClientStore(): IPoop[] {
    return gameState.poop;
}
