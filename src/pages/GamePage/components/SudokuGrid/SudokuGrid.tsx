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
import { getInclusiveRange } from '@/algorithms/helpers';

export const SudokuGrid: React.FC<ISudokuGridProps> = ({ className, gameStatus, errorCells, onSelectCell }) => {
    const { board, solution, hintCell, checkMode } = useSelector((state: RootState) => state.gameGrid);
    const { gamePaused } = useSelector((state: RootState) => state.gameControls);

    const gridClassNames = useGridClassNames(gameStatus, checkMode, className);
    const cellsClassNames = useCellsClassNames(gameStatus, errorCells, hintCell, checkMode);

    const handleCellClick = (cell: Coordinate) => {
        if (gameStatus !== GameStatus.SUCCESS && !checkMode) {
            onSelectCell(cell);
        }
    };

    const renderCell = (r: number, c: number) => {
        const cellValue = board[r][c].val || (hintCell?.[0] === r && hintCell?.[1] === c ? solution[r][c].val : 0);
        const cellNotes = board[r][c].notes;

        return (
            <div
                key={r * board.length + c}
                className={classnames(cellsClassNames[r][c])}
                onClick={() => handleCellClick([r, c])}
            >
                {cellValue ||
                    getInclusiveRange(1, board.length).map(val => (
                        <div
                            key={val}
                            className={classnames(styles.CellNote, !cellNotes.includes(val) && styles.hidden)}
                        >
                            {val}
                        </div>
                    ))}
            </div>
        );
    };

    return (
        <div className={styles.SudokuGrid}>
            {gamePaused && <PauseOverlay />}
            <div className={classnames(gridClassNames)}>
                {board.map((row, r) => (
                    <React.Fragment key={r}>{row.map((_, c) => renderCell(r, c))}</React.Fragment>
                ))}
            </div>
        </div>
    );
};
