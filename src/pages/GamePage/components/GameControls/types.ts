import { Coordinate } from '@/app/types';
import { GameStatus } from '../../const';

export interface IGameControlsProps {
    gameStatus: GameStatus;
    onSelectValue: (val: number) => void;
    onShowHint: () => void;
    onTriggerCheckMode: () => void;
    selectedCell?: Coordinate;
    selectedValue?: number;
}
