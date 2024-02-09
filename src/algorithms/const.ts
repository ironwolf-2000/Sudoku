import { SudokuType } from '@/app/const';

export const INITIAL_CLUE_COUNT: Record<SudokuType, Record<number, number[]>> = {
    [SudokuType.CLASSIC]: {
        4: [10, 8, 6, 5, 4],
        6: [14, 12, 11, 10, 8],
        8: [27, 24, 21, 19, 17],
        9: [36, 32, 28, 26, 23],
    },
    [SudokuType.DIAGONALS]: {
        4: [8, 7, 6, 5, 4],
        6: [12, 11, 10, 8, 7],
        8: [24, 22, 18, 16, 15],
        9: [34, 31, 27, 25, 22],
    },
    [SudokuType.EVEN_ODD]: {
        4: [10, 8, 6, 5, 4],
        6: [14, 12, 11, 10, 8],
        8: [27, 24, 21, 19, 17],
        9: [36, 32, 28, 26, 23],
    },
};
