import { RawBoard, Board } from '@/app/types';
import { SudokuType } from '@/app/const';
import {
    getShuffledCopy,
    getInclusiveRange,
    getEmptyCells,
    convertToBoard,
    getDeepCopy,
    generateInitialBoard,
    getAvailableValues,
    isValid,
} from './helpers';

const solveSudoku = (sudokuType: SudokuType, board: RawBoard): RawBoard | null => {
    const emptyCells = getEmptyCells(board);
    let i = 0;

    while (i < emptyCells.length) {
        const [r, c] = emptyCells[i];
        const values = getAvailableValues(sudokuType, board, r, c);

        if (values.size === 0) {
            return null;
        }

        if (values.size === 1) {
            board[r][c] = values.values().next().value;
            emptyCells.splice(i, 1);
            i = -1;
        }

        i++;
    }

    if (emptyCells.length === 0) {
        return board;
    }

    const [r, c] = emptyCells[0];

    for (const val of getShuffledCopy(getInclusiveRange(1, board.length))) {
        if (isValid(sudokuType, board, r, c, val)) {
            board[r][c] = val;

            const result = solveSudoku(sudokuType, getDeepCopy(board));
            if (result) {
                return result;
            }

            board[r][c] = 0;
        }
    }

    return null;
};

const hasMultipleSolutions = (
    sudokuType: SudokuType,
    board: RawBoard,
    r0: number,
    c0: number,
    previousValue: number
): boolean => {
    for (const val of getAvailableValues(sudokuType, board, r0, c0)) {
        if (val !== previousValue) {
            board[r0][c0] = val;

            if (solveSudoku(sudokuType, getDeepCopy(board))) {
                return true;
            }

            board[r0][c0] = 0;
        }
    }

    return false;
};

const removeClues = (sudokuType: SudokuType, board: RawBoard, cluesToRemove: number): RawBoard | null => {
    const indices = getShuffledCopy(getInclusiveRange(0, board.length ** 2 - 1));
    let removedCount = 0;

    while (removedCount < cluesToRemove) {
        const index = indices.pop();
        if (typeof index === 'undefined') {
            return null;
        }

        const r = Math.floor(index / board.length);
        const c = index % board.length;

        const previousValue = board[r][c];
        board[r][c] = 0;
        removedCount++;

        if (hasMultipleSolutions(sudokuType, board, r, c, previousValue)) {
            board[r][c] = previousValue;
            removedCount--;
        }
    }

    return board;
};

export const createNewGame = (sudokuType: SudokuType, boardSize: number, cluesToKeep: number): [Board, Board] => {
    let solution: RawBoard | null = null;
    while (solution === null) {
        solution = solveSudoku(sudokuType, generateInitialBoard(boardSize));
    }

    let board = null;
    while (board === null) {
        board = removeClues(sudokuType, getDeepCopy(solution), boardSize ** 2 - cluesToKeep);
    }

    return [convertToBoard(board), convertToBoard(solution)];
};
