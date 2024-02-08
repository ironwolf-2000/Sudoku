import { SudokuType } from '@/app/const';
import { RawBoard } from '@/app/types';
import { getCoordinatesFromCurrentBox, getCoordinatesFromCurrentDiagonals } from './helpers';

const isRowValid = (board: RawBoard, r0: number, c0: number, val: number): boolean => {
    for (let c = 0; c < board.length; c++) {
        if (c !== c0 && board[r0][c] === val) {
            return false;
        }
    }

    return true;
};

const isColumnValid = (board: RawBoard, r0: number, c0: number, val: number): boolean => {
    for (let r = 0; r < board.length; r++) {
        if (r !== r0 && board[r][c0] === val) {
            return false;
        }
    }

    return true;
};

const isBoxValid = (board: RawBoard, r0: number, c0: number, val: number): boolean => {
    for (const [r, c] of getCoordinatesFromCurrentBox(board, r0, c0)) {
        if ((r !== r0 || c !== c0) && board[r][c] === val) {
            return false;
        }
    }

    return true;
};

const areDiagonalsValid = (board: RawBoard, r0: number, c0: number, val: number): boolean => {
    for (const [r, c] of getCoordinatesFromCurrentDiagonals(board, r0, c0)) {
        if ((r !== r0 || c !== c0) && board[r][c] === val) {
            return false;
        }
    }

    return true;
};

export const isValid = (sudokuType: SudokuType, board: RawBoard, r: number, c: number, val: number): boolean => {
    let valid = isRowValid(board, r, c, val) && isColumnValid(board, r, c, val) && isBoxValid(board, r, c, val);

    if (sudokuType === SudokuType.DIAGONALS) {
        valid = valid && areDiagonalsValid(board, r, c, val);
    }

    return valid;
};
