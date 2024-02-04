import { SudokuType } from '@/app/const';
import { Board, Coordinate } from '@/app/types';

const getCoordinatesFromRow = (r: number): Coordinate[] => {
    const res: Coordinate[] = [];

    for (let i = 0; i < 9; i++) {
        res.push([r, i]);
    }

    return res;
};

const getCoordinatesFromColumn = (c: number): Coordinate[] => {
    const res: Coordinate[] = [];

    for (let i = 0; i < 9; i++) {
        res.push([i, c]);
    }

    return res;
};

const getCoordinatesFromBox = (r: number, c: number): Coordinate[] => {
    [r, c] = [r, c].map(el => Math.floor(el / 3) * 3);
    const res: Coordinate[] = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            res.push([r + i, c + j]);
        }
    }

    return res;
};

const getCoordinatesFromDiagonal = (r: number, c: number): Coordinate[] => {
    const N = 9;
    const res: Coordinate[] = [];

    for (let i = 0; i < N; i++) {
        if (r === c) {
            res.push([i, i]);
        }

        if (r + c === N - 1) {
            res.push([i, N - 1 - i]);
        }
    }

    return res;
};

export const getSelectedCoordinates = (sudokuType: SudokuType, cell?: Coordinate): Coordinate[] => {
    if (!cell) {
        return [];
    }

    const res = [
        ...getCoordinatesFromRow(cell[0]),
        ...getCoordinatesFromColumn(cell[1]),
        ...getCoordinatesFromBox(cell[0], cell[1]),
    ];

    if (sudokuType === SudokuType.DIAGONALS) {
        res.push(...getCoordinatesFromDiagonal(cell[0], cell[1]));
    }

    return res;
};

export const isBadCell = (sudokuType: SudokuType, board: Board, r0: number, c0: number) => {
    const coordinates = getSelectedCoordinates(sudokuType, [r0, c0]);

    for (const [r, c] of coordinates) {
        if ((r !== r0 || c !== c0) && board[r][c].val !== 0 && board[r][c].val === board[r0][c0].val) {
            return true;
        }
    }

    return false;
};
