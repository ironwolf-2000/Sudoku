import { Board } from '@/App.types';

export interface IGridSudokuClassicProps {
    className?: string;
    board: Board;
    solution: Board;
}
