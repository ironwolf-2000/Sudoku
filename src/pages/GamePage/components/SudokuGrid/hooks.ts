import { Board, Coordinate } from '@/app/types';
import { GameStatus } from '../../const';
import styles from './SudokuGrid.module.scss';
import { getCoordinatesFromBox } from './helpers';

export const useGridClassNames = (gameStatus: GameStatus, checkMode?: boolean, customClassName?: string) => {
    const classNames = [styles.SudokuGrid, customClassName];

    const success = gameStatus === GameStatus.SUCCESS;
    const failure = gameStatus === GameStatus.FAILURE;

    if (!checkMode && success) {
        classNames.push(styles.success);
    }

    if (!checkMode && failure) {
        classNames.push(styles.failure);
    }

    return classNames;
};

export const useCellsClassNames = (
    board: Board,
    errorCells: Coordinate[],
    checkMode?: boolean,
    selectedCell?: Coordinate,
    hintCell?: Coordinate,
    selectedValue?: number
) => {
    const classNames: string[][][] = [];

    for (let i = 0; i < board.length; i++) {
        classNames.push([]);

        for (let j = 0; j < board.length; j++) {
            const value = board[i][j].val;

            const clue = Boolean(board[i][j].clue);
            const error = errorCells.some(([r, c]) => r === i && c === j);
            const correct = value && !clue && !error;

            const selected = selectedCell?.[0] === i && selectedCell?.[1] === j;
            const hint = hintCell?.[0] === i && hintCell?.[1] === j;

            const sameRow = selectedCell?.[0] === i;
            const sameColumn = selectedCell?.[1] === j;
            const sameBox = selectedCell && getCoordinatesFromBox(selectedCell).some(([r, c]) => r === i && c === j);

            classNames[i].push([styles.Cell]);

            Object.entries({ hint, clue, error, correct, checkMode }).forEach(([key, val]) => {
                if (val) {
                    classNames[i][j].push(styles[key]);
                }
            });

            if (hint) {
                classNames[i][j].push(error ? styles.error : styles.correct);
            }

            if (sameRow || sameColumn || sameBox) {
                classNames[i][j].push(styles.affected);
            }

            if (selected || value === selectedValue) {
                classNames[i][j].push(styles.selected);
            }
        }
    }

    return classNames;
};
