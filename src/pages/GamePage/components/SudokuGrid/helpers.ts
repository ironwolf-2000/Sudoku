import { getAffectedCoordinates } from '@/algorithms/helpers';
import { SudokuType } from '@/app/const';
import { Board, Coordinate } from '@/app/types';

export const isBadCell = (sudokuType: SudokuType, board: Board, r0: number, c0: number) => {
    for (const [r, c] of getAffectedCoordinates(sudokuType, board.length, r0, c0)) {
        if ((r !== r0 || c !== c0) && board[r][c].val !== 0 && board[r][c].val === board[r0][c0].val) {
            return true;
        }
    }

    return false;
};

export const getShadedCoordinates = (sudokuType: SudokuType, solution: Board): Coordinate[] => {
    const res: Coordinate[] = [];

    if (sudokuType === SudokuType.DIAGONALS) {
        for (let i = 0; i < solution.length; i++) {
            res.push([i, i]);
            res.push([i, solution.length - 1 - i]);
        }
    } else if (sudokuType === SudokuType.EVEN_ODD) {
        for (let i = 0; i < solution.length; i++) {
            for (let j = 0; j < solution.length; j++) {
                if (solution[i][j].val % 2 === 0) {
                    res.push([i, j]);
                }
            }
        }
    }

    return res;
};

export const hasCoordinate = (coordinates: Coordinate[], [r0, c0]: Coordinate) => {
    return coordinates.some(([r, c]) => r === r0 && c === c0);
};
