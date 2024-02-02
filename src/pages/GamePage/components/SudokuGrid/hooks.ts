import { useSelector } from 'react-redux';

import { RootState } from '@/app';
import { Board, Coordinate } from '@/app/types';
import { GameStatus } from '../../const';
import styles from './SudokuGrid.module.scss';
import { getSelectedCoordinates } from './helpers';

export const useGridClassNames = (gameStatus: GameStatus, checkMode?: boolean, customClassName?: string) => {
    const classNames = [styles.Content, customClassName];

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
    const { sudokuType } = useSelector((state: RootState) => state.gameSettings);
    const classNames: string[][][] = [];

    for (let i = 0; i < board.length; i++) {
        classNames.push([]);

        for (let j = 0; j < board.length; j++) {
            classNames[i].push([styles.Cell]);
            const value = board[i][j].val;

            const hint = hintCell?.[0] === i && hintCell?.[1] === j;
            const clue = Boolean(board[i][j].clue);
            const error = errorCells.some(([r, c]) => r === i && c === j);
            const correct = value && !clue && !error;
            const selected =
                (selectedCell && i === selectedCell[0] && j === selectedCell[1]) || value === selectedValue;
            const affected = getSelectedCoordinates(sudokuType, selectedCell).some(([r, c]) => r === i && c === j);

            Object.entries({ checkMode, hint, clue, error, correct, selected, affected }).forEach(([key, val]) => {
                if (val) {
                    classNames[i][j].push(styles[key]);
                }
            });

            if (hint) {
                classNames[i][j].push(error ? styles.error : styles.correct);
            }
        }
    }

    return classNames;
};
