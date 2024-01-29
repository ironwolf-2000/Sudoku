import { Board, Coordinate } from '@/app/types';
import { GameStatus } from '../../const';

export interface ISudokuGridProps {
    className?: string;
    board?: Board;
    selectedValue?: number;
    selectedCell?: Coordinate;
    hintCell?: Coordinate;
    onSelectCell: (cell: Coordinate) => void;
    solution?: Board;
    clueCells: Set<string>;
    errorCells: Set<string>;
    gameStatus: GameStatus;
    checkMode?: boolean;
}