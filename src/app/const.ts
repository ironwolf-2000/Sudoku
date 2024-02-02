export const PATHS = {
    MAIN: '/',
    GAME: '/game',
} as const;

export const TOTAL_LEVEL_COUNT = 5;

export enum SudokuType {
    CLASSIC = 'CLASSIC',
    DIAGONALS = 'DIAGONALS',
}
