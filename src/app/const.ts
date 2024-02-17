import { ClueCount } from './types';

export enum SudokuType {
    CLASSIC = 'CLASSIC',
    DIAGONAL = 'DIAGONAL',
    EVEN_ODD = 'EVEN_ODD',
}

export const SUDOKU_TYPES = [SudokuType.CLASSIC, SudokuType.DIAGONAL, SudokuType.EVEN_ODD];

export const sudokuTypeToLabel = {
    [SudokuType.CLASSIC]: 'classic',
    [SudokuType.DIAGONAL]: 'diagonal',
    [SudokuType.EVEN_ODD]: 'even/odd',
};

export const GRID_SIZES = [4, 6, 8, 9];

export const MINIMUM_CLUE_COUNT: ClueCount = {
    [SudokuType.CLASSIC]: {
        4: 5,
        6: 9,
        8: 22,
        9: 24,
    },
    [SudokuType.DIAGONAL]: {
        4: 4,
        6: 9,
        8: 21,
        9: 23,
    },
    [SudokuType.EVEN_ODD]: {
        4: 5,
        6: 9,
        8: 22,
        9: 24,
    },
};

export const INITIAL_CLUE_COUNT: ClueCount = {
    [SudokuType.CLASSIC]: {
        4: 8,
        6: 18,
        8: 32,
        9: 40,
    },
    [SudokuType.DIAGONAL]: {
        4: 8,
        6: 18,
        8: 32,
        9: 40,
    },
    [SudokuType.EVEN_ODD]: {
        4: 8,
        6: 18,
        8: 32,
        9: 40,
    },
};

export const LAPTOP_BREAKPOINT = 1024;

export enum LayoutType {
    MOBILE = 'MOBILE',
    DESKTOP = 'DESKTOP',
}

export const PATHS = {
    MAIN: '/',
    GAME: '/game',
} as const;
