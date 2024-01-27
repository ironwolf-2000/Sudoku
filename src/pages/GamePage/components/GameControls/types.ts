import { Coordinate } from '@/app/types';
import { GameStatus } from '../../const';

export interface IGameControlsProps {
    gameStatus: GameStatus;
    onSelectValue: (val: number) => void;
    onShowHint: () => void;
    onErase: () => void;
    onTriggerCheckMode: () => void;
    onUpdateBoard: (val: number) => void;
    selectedCell?: Coordinate;
    selectedValue?: number;
}
