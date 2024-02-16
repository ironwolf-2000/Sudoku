import { SudokuType } from '@/app/const';

export const INITIAL_CLUE_COUNT: Record<SudokuType, Record<number, number[]>> = {
    [SudokuType.CLASSIC]: {
        4: [10, 8, 7, 6, 5],
        6: [16, 15, 13, 11, 9],
        8: [33, 29, 26, 24, 22],
        9: [36, 32, 29, 26, 24],
    },
    [SudokuType.DIAGONALS]: {
        4: [8, 7, 6, 5, 4],
        6: [16, 15, 13, 11, 9],
        8: [27, 25, 23, 22, 21],
        9: [34, 31, 27, 25, 23],
    },
    [SudokuType.EVEN_ODD]: {
        4: [10, 8, 7, 6, 5],
        6: [16, 15, 13, 11, 9],
        8: [33, 29, 26, 24, 22],
        9: [36, 32, 29, 26, 24],
    },
};
