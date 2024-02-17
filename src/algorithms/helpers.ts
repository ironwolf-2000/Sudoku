import { SudokuType } from '@/app/const';
import { Grid, Coordinate, RawGrid } from '@/app/types';

export const convertToGrid = (rawGrid: RawGrid): Grid => {
    return rawGrid.map(row => row.map(val => ({ val, notes: [], clue: val !== 0 })));
};

export const getInclusiveRange = (lo: number, hi: number): number[] => {
    return Array(hi - lo + 1)
        .fill(null)
        .map((_, i) => i + lo);
};

export const randomChoice = <T>(array: T[]): T => {
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

export const getEmptyCells = (grid: RawGrid): Coordinate[] => {
    const res: Coordinate[] = [];

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === 0) {
                res.push([r, c]);
            }
        }
    }

    return res;
};

const getCoordinatesFromCurrentRow = (gridSize: number, r: number): Coordinate[] => {
    const res: Coordinate[] = [];

    for (let i = 0; i < gridSize; i++) {
        res.push([r, i]);
    }

    return res;
};

const getCoordinatesFromCurrentColumn = (gridSize: number, c: number): Coordinate[] => {
    const res: Coordinate[] = [];

    for (let i = 0; i < gridSize; i++) {
        res.push([i, c]);
    }

    return res;
};

const getCoordinatesFromCurrentBox = (gridSize: number, r: number, c: number): Coordinate[] => {
    const perfectSquare = gridSize === 4 || gridSize === 9;
    const rowLength = perfectSquare ? Math.floor(Math.sqrt(gridSize)) : 2;
    const columnLength = perfectSquare ? rowLength : Math.floor(gridSize / 2);

    const r0 = Math.floor(r / rowLength) * rowLength;
    const c0 = Math.floor(c / columnLength) * columnLength;
    const res: Coordinate[] = [];

    for (let i = r0; i < r0 + rowLength; i++) {
        for (let j = c0; j < c0 + columnLength; j++) {
            res.push([i, j]);
        }
    }

    return res;
};

const getCoordinatesFromCurrentDiagonals = (gridSize: number, r: number, c: number): Coordinate[] => {
    const res: Coordinate[] = [];

    for (let i = 0; i < gridSize; i++) {
        if (r === c) {
            res.push([i, i]);
        }

        if (r + c === gridSize - 1) {
            res.push([i, gridSize - 1 - i]);
        }
    }

    return res;
};

export const getAffectedCoordinates = (
    sudokuType: SudokuType,
    gridSize: number,
    r0: number,
    c0: number
): Coordinate[] => {
    const res = [
        ...getCoordinatesFromCurrentRow(gridSize, r0),
        ...getCoordinatesFromCurrentColumn(gridSize, c0),
        ...getCoordinatesFromCurrentBox(gridSize, r0, c0),
    ];

    if (sudokuType === SudokuType.DIAGONAL) {
        res.push(...getCoordinatesFromCurrentDiagonals(gridSize, r0, c0));
    }

    return res;
};

export const getAvailableValues = (sudokuType: SudokuType, grid: RawGrid, r0: number, c0: number): Set<number> => {
    const res = new Set(getInclusiveRange(1, grid.length));

    for (const [r, c] of getAffectedCoordinates(sudokuType, grid.length, r0, c0)) {
        res.delete(grid[r][c]);
    }

    return res;
};

export const isValid = (sudokuType: SudokuType, grid: RawGrid, r0: number, c0: number, val: number): boolean => {
    for (const [r, c] of getAffectedCoordinates(sudokuType, grid.length, r0, c0)) {
        if ((r !== r0 || c !== c0) && grid[r][c] === val) {
            return false;
        }
    }

    return true;
};

export const generateInitialGrid = (gridSize: number): RawGrid => {
    const res: RawGrid = [];

    for (let r = 0; r < gridSize; r++) {
        res.push([]);

        for (let c = 0; c < gridSize; c++) {
            res[r].push(0);
        }
    }

    return res;
};
