import { Coordinate } from '@/app/types';
import { GameStatus } from '../../const';

export interface ISudokuGridProps {
    className?: string;
    gameStatus: GameStatus;
    errorCells: Coordinate[];
    onSelectCell: (cell: Coordinate) => void;
}
