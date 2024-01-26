import { Board, Coordinate } from '@/App.types';
import { GameStatus } from '../../GamePage.const';

export interface IGridSudokuClassicProps {
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
