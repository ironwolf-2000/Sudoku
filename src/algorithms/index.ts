import { RawBoard, Coordinate, Board } from '@/app/types';
import { getShuffledCopy, getInclusiveRange, getEmptyCells, convertToBoard, getDeepCopy } from './helpers';
import { isRowValid, isColumnValid, isBoxValid, areDiagonalsValid } from './validators';
import { SudokuType } from '@/app/const';

const isValid = (sudokuType: SudokuType, board: RawBoard, r: number, c: number, val: number): boolean => {
    let valid = isRowValid(board, r, c, val) && isColumnValid(board, r, c, val) && isBoxValid(board, r, c, val);

    if (sudokuType === SudokuType.DIAGONALS) {
        valid = valid && areDiagonalsValid(board, r, c, val);
    }

    return valid;
};

const generateFilledBoard = (sudokuType: SudokuType): RawBoard | null => {
    const board: RawBoard = [];
    const emptyCells: Coordinate[] = [];

    for (let r = 0; r < 9; r++) {
        board.push([]);

        for (let c = 0; c < 9; c++) {
            board[r].push(0);
            emptyCells.push([r, c]);
        }
    }

    const backtrack = (index: number): RawBoard | null => {
        if (index === emptyCells.length) {
            return board;
        }

        const [r, c] = emptyCells[index];

        for (const val of getShuffledCopy(getInclusiveRange(1, board.length))) {
            if (isValid(sudokuType, board, r, c, val)) {
                board[r][c] = val;

                if (backtrack(index + 1)) {
                    return board;
                }

                board[r][c] = 0;
            }
        }

        return null;
    };

    return backtrack(0);
};

const getAvailableValues = (board: RawBoard, r: number, c: number): Set<number> => {
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

const hasMultipleSolutions = (
    sudokuType: SudokuType,
    board: RawBoard,
    r0: number,
    c0: number,
    previousValue: number
): boolean => {
    const isSolvable = (board: RawBoard): boolean => {
        const emptyCells = getEmptyCells(board);
        let i = 0;

        while (i < emptyCells.length) {
            const [r, c] = emptyCells[i];
            const values = getAvailableValues(board, r, c);

            if (values.size === 0) {
                return false;
            }

            if (values.size === 1) {
                board[r][c] = values.values().next().value;
                emptyCells.splice(i, 1);
                i = -1;
            }

            i++;
        }

        if (emptyCells.length === 0) {
            return true;
        }

        const [r, c] = emptyCells[0];

        for (const val of getShuffledCopy(getInclusiveRange(1, board.length))) {
            if (isValid(sudokuType, board, r, c, val)) {
                board[r][c] = val;

                if (isSolvable(getDeepCopy(board))) {
                    return true;
                }

                board[r][c] = 0;
            }
        }

        return false;
    };

    for (const val of getAvailableValues(board, r0, c0)) {
        if (val !== previousValue) {
            board[r0][c0] = val;

            if (isSolvable(getDeepCopy(board))) {
                return true;
            }

            board[r0][c0] = 0;
        }
    }

    return false;
};

const removeClues = (sudokuType: SudokuType, board: RawBoard, target: number): RawBoard | null => {
    let currentCount = board.length ** 2;
    const indices = getShuffledCopy(getInclusiveRange(0, currentCount - 1));

    while (currentCount > target) {
        const index = indices.pop();
        if (typeof index === 'undefined') {
            return null;
        }

        const r = Math.floor(index / board.length);
        const c = index % board.length;

        const previousValue = board[r][c];
        board[r][c] = 0;
        currentCount--;

        if (hasMultipleSolutions(sudokuType, board, r, c, previousValue)) {
            board[r][c] = previousValue;
            currentCount++;
        }
    }

    return board;
};

export const createNewGame = (sudokuType: SudokuType, clueCount: number): [Board, Board] => {
    let solution: RawBoard | null = null;
    while (solution === null) {
        solution = generateFilledBoard(sudokuType);
    }

    let board = null;
    while (board === null) {
        board = removeClues(sudokuType, getDeepCopy(solution), clueCount);
    }

    return [convertToBoard(board), convertToBoard(solution)];
};
