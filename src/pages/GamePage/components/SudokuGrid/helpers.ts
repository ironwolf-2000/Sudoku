import { SudokuType } from '@/app/const';
import { Board, Coordinate } from '@/app/types';

const getCoordinatesFromRow = (boardSize: number, r: number): Coordinate[] => {
    const res: Coordinate[] = [];

    for (let i = 0; i < boardSize; i++) {
        res.push([r, i]);
    }

    return res;
};

const getCoordinatesFromColumn = (boardSize: number, c: number): Coordinate[] => {
    const res: Coordinate[] = [];

    for (let i = 0; i < boardSize; i++) {
        res.push([i, c]);
    }

    return res;
};

const getCoordinatesFromBox = (boardSize: number, r: number, c: number): Coordinate[] => {
    const boxSize = Math.floor(Math.sqrt(boardSize));
    [r, c] = [r, c].map(el => Math.floor(el / boxSize) * boxSize);
    const res: Coordinate[] = [];

    for (let i = 0; i < boxSize; i++) {
        for (let j = 0; j < boxSize; j++) {
            res.push([r + i, c + j]);
        }
    }

    return res;
};

const getCoordinatesFromDiagonal = (boardSize: number, r: number, c: number): Coordinate[] => {
    const res: Coordinate[] = [];

    for (let i = 0; i < boardSize; i++) {
        if (r === c) {
            res.push([i, i]);
        }

        if (r + c === boardSize - 1) {
            res.push([i, boardSize - 1 - i]);
        }
    }

    return res;
};

export const getSelectedCoordinates = (sudokuType: SudokuType, boardSize: number, cell?: Coordinate): Coordinate[] => {
    if (!cell) {
        return [];
    }

    const res = [
        ...getCoordinatesFromRow(boardSize, cell[0]),
        ...getCoordinatesFromColumn(boardSize, cell[1]),
        ...getCoordinatesFromBox(boardSize, cell[0], cell[1]),
    ];

    if (sudokuType === SudokuType.DIAGONALS) {
        res.push(...getCoordinatesFromDiagonal(boardSize, cell[0], cell[1]));
    }

    return res;
};

export const isBadCell = (sudokuType: SudokuType, board: Board, r0: number, c0: number) => {
    const coordinates = getSelectedCoordinates(sudokuType, board.length, [r0, c0]);

    for (const [r, c] of coordinates) {
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
