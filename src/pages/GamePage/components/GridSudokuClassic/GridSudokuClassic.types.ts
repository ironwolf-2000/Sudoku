import { Board, Coordinate } from '@/App.types';

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
    checkMode?: boolean;
}
