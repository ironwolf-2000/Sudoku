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

export const getAvailableValues = (board: RawBoard, r: number, c: number): Set<number> => {
    const res = new Set(getInclusiveRange(1, board.length));
    const r0 = Math.floor(r / 3) * 3;
    const c0 = Math.floor(c / 3) * 3;

    for (let i = 0; i < board.length; i++) {
        res.delete(board[r][i]);
        res.delete(board[i][c]);
        res.delete(board[r0 + Math.floor(i / 3)][c0 + (i % 3)]);
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
