import { Coordinate } from '@/app/App.types';
import { GameStatus } from '../../GamePage.const';

export interface IGameControlsProps {
    onTriggerCheckMode: () => void;
    onShowHint: () => void;
    emptyCells: Coordinate[];
    selectedCell?: Coordinate;
    selectedValue?: number;
    onUpdateBoard: (val: number) => void;
    onSelectValue: (val: number) => void;
    gameStatus: GameStatus;
}
