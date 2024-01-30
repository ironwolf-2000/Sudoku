import { RawBoard, Board, Coordinate } from '@/app/types';
import { INITIAL_BOARD } from './const';

export const convertToBoard = (rawBoard: RawBoard): Board => {
    return rawBoard.map(row => row.map(val => ({ clue: val !== 0, val })));
};

export const getInclusiveRange = (lo: number, hi: number): number[] => {
    return Array(hi - lo + 1)
        .fill(null)
        .map((_, i) => i + lo);
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
export const getDeepCopy = (array: any): any => {
    if (!Array.isArray(array)) {
        return array;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any[] = [];
    array.forEach(el => res.push(getDeepCopy(el)));

    return res;
};

const isRowValid = (board: RawBoard, r: number, c: number, val: number): boolean => {
    for (let j = 0; j < board.length; j++) {
        if (c !== j && board[r][j] === val) {
            return false;
        }
    }

    return true;
};

const isColumnValid = (board: RawBoard, r: number, c: number, val: number): boolean => {
    for (let i = 0; i < board.length; i++) {
        if (r !== i && board[i][c] === val) {
            return false;
        }
    }

    return true;
};

const isBoxValid = (board: RawBoard, r: number, c: number, val: number): boolean => {
    const r0 = Math.floor(r / 3) * 3;
    const c0 = Math.floor(c / 3) * 3;

    for (let i = 0; i < board.length; i++) {
        const r1 = r0 + Math.floor(i / 3);
        const c1 = c0 + (i % 3);

        if ((r !== r1 || c !== c1) && board[r1][c1] === val) {
            return false;
        }
    }

    return true;
};

const isValid = (board: RawBoard, r: number, c: number, val: number): boolean => {
    return isRowValid(board, r, c, val) && isColumnValid(board, r, c, val) && isBoxValid(board, r, c, val);
};

// ==== Sudoku Solver ==== //

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

export const solveSudoku = (board: RawBoard, emptyCells: Coordinate[]): RawBoard | null => {
    let res: RawBoard | null = null;

    const backtrack = (empty: Coordinate[], index: number) => {
        if (index === empty.length) {
            if (res !== null) {
                throw new Error();
            }

            res = board.map(row => row.slice());
            return;
        }

        const [r, c] = empty[index];

        for (const k of getShuffledCopy(getInclusiveRange(1, 9))) {
            if (isValid(board, r, c, k)) {
                board[r][c] = k;
                backtrack(empty, index + 1);
                board[r][c] = 0;
            }
        }
    };

    backtrack(emptyCells, 0);
    return res;
};

export const generateSudoku = (): RawBoard => {
    let grid: RawBoard | null = null;

    while (grid === null) {
        try {
            grid = solveSudoku(INITIAL_BOARD, getEmptyCells(INITIAL_BOARD));
        } catch {
            /* empty */
        }
    }

    return grid;
};
