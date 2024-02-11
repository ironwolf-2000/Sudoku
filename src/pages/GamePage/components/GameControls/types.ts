import { Coordinate } from '@/app/types';
import { GameStatus } from '../../const';

export interface IGameControlsProps {
    gameStatus: GameStatus;
    emptyCells: Coordinate[];
    onTriggerCheckMode: () => void;
    onShowHint: () => void;
}
