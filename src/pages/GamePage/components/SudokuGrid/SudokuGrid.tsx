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

export const SudokuGrid: React.FC<ISudokuGridProps> = ({ className, gameStatus, onSelectCell, onSetValue }) => {
    const { withOverlay } = useSelector((state: RootState) => state.appSettings);
    const { grid, solution, hintCell } = useSelector((state: RootState) => state.gameGrid);
    const { gamePaused } = useSelector((state: RootState) => state.gameHeader);

    const [currentCell, setCurrentCell] = useState<Coordinate | null>(null);

    const gridClassNames = useGridClassNames(gameStatus, className);
    const cellsClassNames = useCellsClassNames(gameStatus, hintCell);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (withOverlay || gameStatus === GameStatus.SUCCESS) {
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
                    setCurrentCell([Math.min(r + 1, grid.length - 1), c]);
                } else if (event.key.endsWith('Left')) {
                    setCurrentCell([r, Math.max(c - 1, 0)]);
                } else if (event.key.endsWith('Right')) {
                    setCurrentCell([r, Math.min(c + 1, grid.length - 1)]);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [grid.length, currentCell, onSetValue, withOverlay]);

    useEffect(() => {
        if (gameStatus !== GameStatus.SUCCESS && currentCell) {
            onSelectCell(currentCell);
        }
    }, [currentCell, gameStatus, onSelectCell]);

    const renderCell = (r: number, c: number) => {
        const cellValue = grid[r][c].val || (hintCell?.[0] === r && hintCell?.[1] === c ? solution[r][c].val : 0);
        const cellNotes = grid[r][c].notes;

        return (
            <div
                key={r * grid.length + c}
                className={classnames(cellsClassNames[r][c])}
                onClick={() => setCurrentCell([r, c])}
            >
                {cellValue ||
                    getInclusiveRange(1, grid.length).map(val => (
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
                {grid.map((row, r) => (
                    <React.Fragment key={r}>{row.map((_, c) => renderCell(r, c))}</React.Fragment>
                ))}
            </div>
        </div>
    );
};
