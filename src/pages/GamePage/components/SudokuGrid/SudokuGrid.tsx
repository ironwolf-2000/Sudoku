import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import { Coordinate } from '@/app/types';
import { ISudokuGridProps } from './types';
import { useCellsClassNames, useGridClassNames } from './hooks';
import { GameStatus } from '../../const';
import { RootState } from '@/app';
import { PauseOverlay } from '..';
import styles from './SudokuGrid.module.scss';
import { SudokuType } from '@/app/const';

export const SudokuGrid: React.FC<ISudokuGridProps> = ({
    className,
    selectedValue,
    selectedCell,
    hintCell,
    onSelectCell,
    gameStatus,
    board,
    solution,
    errorCells,
    checkMode,
}) => {
    const { sudokuType } = useSelector((state: RootState) => state.gameSettings);
    const { gamePaused } = useSelector((state: RootState) => state.gameControls);
    const gridClassNames = useGridClassNames(gameStatus, checkMode, className);
    const cellsClassNames = useCellsClassNames(board, errorCells, checkMode, selectedCell, hintCell, selectedValue);

    const success = gameStatus === GameStatus.SUCCESS;

    const handleCellClick = (cell: Coordinate) => {
        if (!success && !checkMode && !board[cell[0]][cell[1]].clue) {
            onSelectCell(cell);
        }
    };

    return (
        <div className={styles.SudokuGrid}>
            {gamePaused && <PauseOverlay />}
            {sudokuType === SudokuType.DIAGONALS && (
                <>
                    <div className={styles.MainDiagonal}></div>
                    <div className={styles.AntiDiagonal}></div>
                </>
            )}
            <div className={classnames(gridClassNames)}>
                {board.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map(({ val }, j) => (
                            <div
                                key={i * row.length + j}
                                className={classnames(cellsClassNames[i][j])}
                                onClick={() => handleCellClick([i, j])}
                            >
                                {val || (hintCell?.[0] === i && hintCell?.[1] === j && solution[i][j].val)}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
