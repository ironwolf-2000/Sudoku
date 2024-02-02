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

export const solveSudoku = (sudokuType: SudokuType, board: RawBoard, emptyCells: Coordinate[]): RawBoard | null => {
    const backtrack = (empty: Coordinate[], index: number) => {
        if (index === empty.length) {
            return board;
        }

        const [r, c] = empty[index];

        for (const k of getShuffledCopy(getInclusiveRange(1, 9))) {
            if (isValid(sudokuType, board, r, c, k)) {
                board[r][c] = k;

                if (backtrack(empty, index + 1)) {
                    return board;
                }

                board[r][c] = 0;
            }
        }

        return null;
    };

    return backtrack(emptyCells, 0);
};

export const generateSudoku = (sudokuType: SudokuType): RawBoard => {
    let grid: RawBoard | null = null;

    while (grid === null) {
        try {
            const board: RawBoard = [];
            const emptyCells: Coordinate[] = [];

            for (let i = 0; i < 9; i++) {
                board.push([]);

                for (let j = 0; j < 9; j++) {
                    board[i].push(0);
                    emptyCells.push([i, j]);
                }
            }

            grid = solveSudoku(sudokuType, board, emptyCells);
        } catch {
            /* empty */
        }
    }

    return grid;
};

const removeClues = (sudokuType: SudokuType, board: RawBoard, cluesCount: number): RawBoard => {
    let filledCount = board.length ** 2;
    const indices = getShuffledCopy(getInclusiveRange(0, filledCount));

    while (filledCount > cluesCount) {
        const index = indices.pop();

        if (typeof index === 'undefined') {
            throw new Error();
        }

        const r = Math.floor(index / board.length);
        const c = index % board.length;

        if (board[r][c] === 0) {
            continue;
        }

        const previousValue = board[r][c];
        board[r][c] = 0;
        filledCount--;

        try {
            solveSudoku(sudokuType, getDeepCopy(board), getEmptyCells(board));
        } catch {
            board[r][c] = previousValue;
            filledCount++;
        }
    }

    return board;
};

export const createNewGame = (sudokuType: SudokuType, cluesCount: number): [Board, Board] => {
    let solution = null;

    while (solution === null) {
        try {
            solution = generateSudoku(sudokuType);
        } catch {
            /* empty */
        }
    }

    let board = null;

    while (board === null) {
        try {
            board = removeClues(sudokuType, getDeepCopy(solution), cluesCount);
        } catch {
            /* empty */
        }
    }

    return [convertToBoard(board), convertToBoard(solution)];
};
