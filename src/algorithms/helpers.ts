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
