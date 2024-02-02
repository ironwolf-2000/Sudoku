import { RawBoard } from '@/app/types';

export const isRowValid = (board: RawBoard, r: number, c: number, val: number): boolean => {
    for (let j = 0; j < board.length; j++) {
        if (c !== j && board[r][j] === val) {
            return false;
        }
    }

    return true;
};

export const isColumnValid = (board: RawBoard, r: number, c: number, val: number): boolean => {
    for (let i = 0; i < board.length; i++) {
        if (r !== i && board[i][c] === val) {
            return false;
        }
    }

    return true;
};

export const isBoxValid = (board: RawBoard, r: number, c: number, val: number): boolean => {
    const K = Math.floor(Math.sqrt(board.length));

    const r0 = Math.floor(r / K) * K;
    const c0 = Math.floor(c / K) * K;

    for (let i = 0; i < board.length; i++) {
        const r1 = r0 + Math.floor(i / K);
        const c1 = c0 + (i % K);

        if ((r !== r1 || c !== c1) && board[r1][c1] === val) {
            return false;
        }
    }

    return true;
};

export const areDiagonalsValid = (board: RawBoard, r: number, c: number, val: number): boolean => {
    for (let i = 0; i < board.length; i++) {
        const invalidMainDiagonal = r === c && r !== i && board[i][i] === val;
        const invalidAntiDiagonal = r + c === board.length - 1 && r !== i && board[i][board.length - 1 - i] === val;

        if (invalidMainDiagonal || invalidAntiDiagonal) {
            return false;
        }
    }

    return true;
};
