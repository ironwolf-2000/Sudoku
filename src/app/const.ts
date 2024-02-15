export enum SudokuType {
    CLASSIC = 'CLASSIC',
    DIAGONALS = 'DIAGONALS',
    EVEN_ODD = 'EVEN_ODD',
}

export const SUDOKU_TYPES = [SudokuType.CLASSIC, SudokuType.DIAGONALS, SudokuType.EVEN_ODD];

export const sudokuTypeToLabel = {
    [SudokuType.CLASSIC]: 'classic',
    [SudokuType.DIAGONALS]: 'diagonals',
    [SudokuType.EVEN_ODD]: 'even-odd',
};

export const GRID_SIZES = [4, 6, 8, 9];

export const LAPTOP_BREAKPOINT = 1024;

export enum LayoutType {
    MOBILE = 'MOBILE',
    DESKTOP = 'DESKTOP',
}

export const PATHS = {
    MAIN: '/',
    GAME: '/game',
} as const;

export const TOTAL_LEVEL_COUNT = 5;
