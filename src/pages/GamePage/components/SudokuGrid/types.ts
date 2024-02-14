import { Coordinate } from '@/app/types';
import { GameStatus } from '../../const';

export interface ISudokuGridProps {
    className?: string;
    gameStatus: GameStatus;
    onSelectCell: (cell: Coordinate) => void;
    onSetValue: (val: number) => void;
}
