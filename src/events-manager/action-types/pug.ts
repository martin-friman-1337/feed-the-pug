import { IPoopRelatedAffliction } from '../../pug/poopRelatedAfflictions';
import { IAction, IGameObjectPosition } from '../types';

export interface IMovePlayerPugPosition extends IAction  {
    position: IGameObjectPosition
    direction: number,
    speed: number
}

export interface IEatTreat extends IAction {
    treatPosition:IGameObjectPosition
} 

export interface IEatPoop extends IAction {
    EffectSuffered: IPoopRelatedAffliction;
}
