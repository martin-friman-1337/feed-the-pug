import { Position } from "./game-object";

export type GameState = {
    players: IPlayer[];
    treats: ITreat[];
    poop: IPoop[];
}

export interface IClientObject {
    objectId: number;
    position: Position;
    objectType: GAME_OBJECT_TYPE;
}

export interface IClientPlayerSubObject extends IClientObject {
    playerId: string;
    dir?: number;
    speed?: number;
}


export interface ITreat extends IClientObject {
    treatDesirabilityValue: number;
    treatType: GAME_TREAT_TYPE;
}


export interface IPoop extends IClientObject {
    affliction: POOP_AFFLICTION;
}


export interface IPlayer {
    playerId: string;
    pug: IClientPlayerSubObject;
    hand: IClientPlayerSubObject;
}

export enum POOP_AFFLICTION {
    POOMIES = 0,
    TRANSCEND_PUGHOOD_BECOME_DEATH_INCARNATE = 1,
}

export enum GAME_TREAT_TYPE {
    CHICKEN = 'CHICKEN',
    BONE = 'BONE',
}

export enum GAME_OBJECT_TYPE {
    PUG = 'PUG',
    TREAT = 'TREAT',
    POOP = 'POOP',
    HAND = 'HAND',
}
