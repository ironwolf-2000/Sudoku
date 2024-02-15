import { useSelector } from 'react-redux';

import { RootState } from '@/app';
import { Coordinate } from '@/app/types';
import { GameStatus } from '../../const';
import styles from './SudokuGrid.module.scss';
import { getShadedCoordinates, hasCoordinate, isBadCell } from './helpers';
import { getAffectedCoordinates } from '@/algorithms/helpers';

export const useGridClassNames = (gameStatus: GameStatus, customClassName?: string) => {
    const { gridSize } = useSelector((state: RootState) => state.gameSettings);
    const classNames = [styles.Content, styles[`size_${gridSize}`], customClassName];

    if (gameStatus === GameStatus.SUCCESS) {
        classNames.push(styles.success);
    }

    if (gameStatus === GameStatus.FAILURE) {
        classNames.push(styles.failure);
    }

    return classNames;
};

export const useCellsClassNames = (gameStatus: GameStatus, hintCell?: Coordinate) => {
    const { board, solution, selectedCell, selectedValue } = useSelector((state: RootState) => state.gameGrid);
    const { sudokuType } = useSelector((state: RootState) => state.gameSettings);

    const classNames: string[][][] = [];

    for (let i = 0; i < board.length; i++) {
        classNames.push([]);

        for (let j = 0; j < board.length; j++) {
            classNames[i].push([styles.Cell, styles[`size_${board.length}`]]);

            const shaded = hasCoordinate(getShadedCoordinates(sudokuType, solution), [i, j]);
            const hint = hintCell?.[0] === i && hintCell?.[1] === j;
            const clue = Boolean(board[i][j].clue);
            const selected = i === selectedCell?.[0] && j === selectedCell?.[1];

            let affected = board[i][j].val === selectedValue;

            if (selectedCell && board[selectedCell[0]][selectedCell[1]].val === 0) {
                affected = hasCoordinate(
                    getAffectedCoordinates(sudokuType, board.length, selectedCell[0], selectedCell[1]),
                    [i, j]
                );
            }

            const bad = isBadCell(sudokuType, board, i, j);
            const withNotes = board[i][j].val === 0 && (hintCell?.[0] !== i || hintCell?.[1] !== j);

            Object.entries({
                shaded,
                hint,
                clue,
                selected,
                affected,
                bad,
                withNotes,
            }).forEach(([key, val]) => {
                if ((gameStatus !== GameStatus.SUCCESS || key === 'shaded') && val) {
                    classNames[i][j].push(styles[key]);
                }
            });
        }
    }

    return classNames;
};
