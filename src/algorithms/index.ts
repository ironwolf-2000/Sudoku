import { RawGrid, Grid, Coordinate } from '@/app/types';
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

const getUniqueMirroredCoordinates = (gridSize: number, r0: number, c0: number): Coordinate[] => {
    const unique = new Set(
        [
            [r0, c0],
            [gridSize - r0 - 1, gridSize - c0 - 1],
            [gridSize - r0 - 1, c0],
            [r0, gridSize - c0 - 1],
        ].map(([r, c]) => `${r} ${c}`)
    );

    return Array.from(unique).reduce((acc, cur) => {
        const [r, c] = cur.split(' ').map(Number);
        acc.push([r, c]);

        return acc;
    }, [] as Coordinate[]);
};

const removeClues = (sudokuType: SudokuType, grid: RawGrid, cluesToRemove: number): RawGrid | null => {
    const total = grid.length ** 2;
    let indices = getShuffledCopy(getInclusiveRange(0, total - 1));

    let removedCount = 0;
    let step = 4;

    while (removedCount < cluesToRemove) {
        while (
            step > cluesToRemove - removedCount ||
            (step === 4 && removedCount > 0.4 * total) ||
            (step === 2 && removedCount > 0.6 * total)
        ) {
            step = Math.floor(step / 2);
        }

        const index = indices[0];
        if (typeof index === 'undefined') {
            return null;
        }

        const r0 = Math.floor(index / grid.length);
        const c0 = index % grid.length;

        const coordinates = getUniqueMirroredCoordinates(grid.length, r0, c0).slice(0, step);
        const removeList = coordinates.map(([r, c]) => r * grid.length + c);
        indices = indices.filter(el => !removeList.includes(el));

        const values = coordinates.map(([r, c]) => grid[r][c]);

        for (let i = 0; i < coordinates.length; i++) {
            const [r, c] = coordinates[i];
            grid[r][c] = 0;
        }

        if (coordinates.some(([r, c], i) => hasMultipleSolutions(sudokuType, grid, r, c, values[i]))) {
            for (let i = 0; i < coordinates.length; i++) {
                const [r, c] = coordinates[i];
                grid[r][c] = values[i];
            }

            continue;
        }

        removedCount += coordinates.length;
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
