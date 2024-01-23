import { Board } from '@/App.types';

export interface IGridSudokuClassicProps {
    className?: string;
    selected?: number;
    board?: Board;
    solution?: Board;
    clueCells: Set<string>;
    errorCells: Set<string>;
    checkMode?: boolean;
    onCellUpdate: (r: number, c: number) => void;
}
