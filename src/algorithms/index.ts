import { RawGrid, Grid } from '@/app/types';
import { SudokuType } from '@/app/const';
import {
    getShuffledCopy,
    getInclusiveRange,
    getEmptyCells,
    convertToGrid,
    getDeepCopy,
    generateInitialGrid,
    getAvailableValues,
    isValid,
} from './helpers';

const solveSudoku = (sudokuType: SudokuType, grid: RawGrid): RawGrid | null => {
    const emptyCells = getEmptyCells(grid);
    let i = 0;

    while (i < emptyCells.length) {
        const [r, c] = emptyCells[i];
        const values = getAvailableValues(sudokuType, grid, r, c);

        if (values.size === 0) {
            return null;
        }

        if (values.size === 1) {
            grid[r][c] = values.values().next().value;
            emptyCells.splice(i, 1);
            i = -1;
        }

        i++;
    }

    if (emptyCells.length === 0) {
        return grid;
    }

    const [r, c] = emptyCells[0];

    for (const val of getShuffledCopy(getInclusiveRange(1, grid.length))) {
        if (isValid(sudokuType, grid, r, c, val)) {
            grid[r][c] = val;

            const result = solveSudoku(sudokuType, getDeepCopy(grid));
            if (result) {
                return result;
            }

            grid[r][c] = 0;
        }
    }

    return null;
};

const hasMultipleSolutions = (
    sudokuType: SudokuType,
    grid: RawGrid,
    r0: number,
    c0: number,
    previousValue: number
): boolean => {
    for (const val of getAvailableValues(sudokuType, grid, r0, c0)) {
        if (val !== previousValue) {
            grid[r0][c0] = val;

            if (solveSudoku(sudokuType, getDeepCopy(grid))) {
                return true;
            }

            grid[r0][c0] = 0;
        }
    }

    return false;
};

const removeClues = (sudokuType: SudokuType, grid: RawGrid, cluesToRemove: number): RawGrid | null => {
    const indices = getShuffledCopy(getInclusiveRange(0, grid.length ** 2 - 1));
    let removedCount = 0;

    while (removedCount < cluesToRemove) {
        const index = indices.pop();
        if (typeof index === 'undefined') {
            return null;
        }

        const r = Math.floor(index / grid.length);
        const c = index % grid.length;

        const previousValue = grid[r][c];
        grid[r][c] = 0;
        removedCount++;

        if (hasMultipleSolutions(sudokuType, grid, r, c, previousValue)) {
            grid[r][c] = previousValue;
            removedCount--;
        }
    }

    return grid;
};

export const createNewGame = (sudokuType: SudokuType, gridSize: number, cluesToKeep: number): [Grid, Grid] => {
    let solution: RawGrid | null = null;
    while (solution === null) {
        solution = solveSudoku(sudokuType, generateInitialGrid(gridSize));
    }

    let grid = null;
    while (grid === null) {
        grid = removeClues(sudokuType, getDeepCopy(solution), gridSize ** 2 - cluesToKeep);
    }

    return [convertToGrid(grid), convertToGrid(solution)];
};
