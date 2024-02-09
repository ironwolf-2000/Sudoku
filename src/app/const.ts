export enum SudokuType {
    CLASSIC = 'CLASSIC',
    DIAGONALS = 'DIAGONALS',
    EVEN_ODD = 'EVEN_ODD',
}

export const BOARD_SIZES = [4, 6, 8, 9] as const;

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
