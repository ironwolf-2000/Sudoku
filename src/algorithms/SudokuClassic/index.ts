import { Board } from '@/App.types';
import { generateSudoku, getDeepCopy, getEmptyCells, getInclusiveRange, getShuffledCopy, solveSudoku } from '../common';

const removeClues = (board: Board, cluesCount: number): Board => {
    let filledCount = board.length ** 2;
    const indices = getShuffledCopy(getInclusiveRange(0, filledCount));

    while (filledCount > cluesCount) {
        const index = indices.pop();

        if (typeof index === 'undefined') {
            throw new Error();
        }

        const r = Math.floor(index / 9);
        const c = index % 9;

        if (board[r][c] === 0) {
            continue;
        }

        const previousValue = board[r][c];
        board[r][c] = 0;
        filledCount--;

        try {
            solveSudoku(getDeepCopy(board), getEmptyCells(board));
        } catch {
            board[r][c] = previousValue;
            filledCount++;
        }
    }

    return board;
};

export const createNewGame = (cluesCount: number): [Board, Board] => {
    let solution = null;

    while (solution === null) {
        try {
            solution = generateSudoku(9);
        } catch {
            /* empty */
        }
    }

    let board = null;

    while (board === null) {
        try {
            board = removeClues(getDeepCopy(solution), cluesCount);
        } catch {
            /* empty */
        }
    }

    return [board, solution];
};
