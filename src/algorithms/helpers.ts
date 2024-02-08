import { SudokuType } from '@/app/const';
import { Board, Coordinate, RawBoard } from '@/app/types';

export const convertToBoard = (rawBoard: RawBoard): Board => {
    return rawBoard.map(row => row.map(val => ({ val, notes: [], clue: val !== 0 })));
};

export const getInclusiveRange = (lo: number, hi: number): number[] => {
    return Array(hi - lo + 1)
        .fill(null)
        .map((_, i) => i + lo);
};

export const randomChoice = <T>(array: T[]): T | undefined => {
    return array[Math.floor(Math.random() * array.length)];
};

export const getShuffledCopy = (values: number[]): number[] => {
    const res = [...values];

    for (let i = 0; i < res.length; i++) {
        const j = i + Math.floor(Math.random() * (res.length - i));
        [res[i], res[j]] = [res[j], res[i]];
    }

    return res;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDeepCopy = (element: any): any => {
    if (!Array.isArray(element)) {
        return element;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any[] = [];
    element.forEach(row => res.push(getDeepCopy(row)));

    return res;
};

export const getEmptyCells = (board: RawBoard): Coordinate[] => {
    const res: Coordinate[] = [];

    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            if (board[r][c] === 0) {
                res.push([r, c]);
            }
        }
    }

    return res;
};

export const getCoordinatesFromCurrentBox = (board: RawBoard, r: number, c: number): Coordinate[] => {
    const perfectSquare = board.length === 4 || board.length === 9;
    const rowLength = perfectSquare ? Math.floor(Math.sqrt(board.length)) : 2;
    const columnLength = perfectSquare ? rowLength : Math.floor(board.length / 2);

    const r0 = Math.floor(r / rowLength) * rowLength;
    const c0 = Math.floor(c / columnLength) * columnLength;
    const res: Coordinate[] = [];

    for (let i = r0; i < r0 + rowLength; i++) {
        for (let j = c0; j < c0 + columnLength; j++) {
            res.push([i, j]);
        }
    }

    return res;
};

export const getCoordinatesFromCurrentDiagonals = (board: RawBoard, r: number, c: number): Coordinate[] => {
    const res: Coordinate[] = [];

    for (let i = 0; i < board.length; i++) {
        if (r === c) {
            res.push([i, i]);
        }

        if (r + c === board.length - 1) {
            res.push([i, board.length - 1 - i]);
        }
    }

    return res;
};

export const getAvailableValues = (sudokuType: SudokuType, board: RawBoard, r0: number, c0: number): Set<number> => {
    const res = new Set(getInclusiveRange(1, board.length));

    for (let i = 0; i < board.length; i++) {
        res.delete(board[r0][i]);
        res.delete(board[i][c0]);
    }

    for (const [r, c] of getCoordinatesFromCurrentBox(board, r0, c0)) {
        res.delete(board[r][c]);
    }

    if (sudokuType === SudokuType.DIAGONALS) {
        for (const [r, c] of getCoordinatesFromCurrentDiagonals(board, r0, c0)) {
            res.delete(board[r][c]);
        }
    }

    return res;
};

export const generateInitialBoard = (boardSize: number): RawBoard => {
    const res: RawBoard = [];

    for (let r = 0; r < boardSize; r++) {
        res.push([]);

        for (let c = 0; c < boardSize; c++) {
            res[r].push(0);
        }
    }

    return res;
};
