import React, { useEffect, useState } from 'react';
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

export const SudokuGrid: React.FC<ISudokuGridProps> = ({
    className,
    gameStatus,
    errorCells,
    onSelectCell,
    onSetValue,
}) => {
    const { withOverlay } = useSelector((state: RootState) => state.appSettings);
    const { board, solution, hintCell, checkMode } = useSelector((state: RootState) => state.gameGrid);
    const { gamePaused } = useSelector((state: RootState) => state.gameControls);

    const [currentCell, setCurrentCell] = useState<Coordinate | null>(null);

    const gridClassNames = useGridClassNames(gameStatus, checkMode, className);
    const cellsClassNames = useCellsClassNames(gameStatus, errorCells, hintCell, checkMode);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (checkMode || withOverlay) {
                return;
            }

            if (/\d/.test(event.key)) {
                onSetValue(Number(event.key));
            } else if (event.key.startsWith('Arrow')) {
                if (!currentCell) {
                    setCurrentCell([0, 0]);
                    return;
                }

                const [r, c] = currentCell;

                if (event.key.endsWith('Up')) {
                    setCurrentCell([Math.max(r - 1, 0), c]);
                } else if (event.key.endsWith('Down')) {
                    setCurrentCell([Math.min(r + 1, board.length - 1), c]);
                } else if (event.key.endsWith('Left')) {
                    setCurrentCell([r, Math.max(c - 1, 0)]);
                } else if (event.key.endsWith('Right')) {
                    setCurrentCell([r, Math.min(c + 1, board.length - 1)]);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [board.length, checkMode, currentCell, onSetValue, withOverlay]);

    useEffect(() => {
        if (gameStatus !== GameStatus.SUCCESS && !checkMode && currentCell) {
            onSelectCell(currentCell);
        }
    }, [checkMode, currentCell, gameStatus, onSelectCell]);

    const renderCell = (r: number, c: number) => {
        const cellValue = board[r][c].val || (hintCell?.[0] === r && hintCell?.[1] === c ? solution[r][c].val : 0);
        const cellNotes = board[r][c].notes;

        return (
            <div
                key={r * board.length + c}
                className={classnames(cellsClassNames[r][c])}
                onClick={() => setCurrentCell([r, c])}
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
