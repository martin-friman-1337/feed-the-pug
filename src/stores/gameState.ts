import { GAME_OBJECT_TYPE, GameState, IPlayer, IPoop, ITreat } from "../types/game-state";

// Initialize the game state
let gameState: GameState = {
    clientPlayer: {
        playerId: "",
        pug: {
            objectId: 0,
            position: { x: 0, y: 0 },
            objectType: GAME_OBJECT_TYPE.PUG,
            playerId: "",
            dir: 0,
            speed: 0
        },
        hand: {
            objectId: 0,
            position: { x: 0, y: 0 },
            objectType: GAME_OBJECT_TYPE.HAND,
            playerId: "",
        }
    },
    otherPlayers: [],
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

// Retrieve other players from the client store
export function getOtherPlayersFromClientStore(): IPlayer[] {
    return gameState.otherPlayers;
}

// Retrieve treats from the client store
export function getTreatsFromClientStore(): ITreat[] {
    return gameState.treats;
}

// Retrieve poop from the client store
export function getPoopFromClientStore(): IPoop[] {
    return gameState.poop;
}
