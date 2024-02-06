import { Coordinate } from '@/app/types';
import { GameStatus } from '../../const';

export interface IGameControlsProps {
    gameStatus: GameStatus;
    onSelectValue: (val: number) => void;
    onTriggerCheckMode: () => void;
    onShowHint: () => void;
    emptyCells: Coordinate[];
    selectedCell?: Coordinate;
    selectedValue?: number;
}
