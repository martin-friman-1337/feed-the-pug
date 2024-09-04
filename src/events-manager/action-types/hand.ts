import { IAction, IGameObjectPosition } from '../types';

export interface IMovePlayerHandPosition extends IAction  {
    position: IGameObjectPosition
    isPinching: boolean
}

export interface IPickupTreat extends IAction {
    treatPosition:IGameObjectPosition
} 
