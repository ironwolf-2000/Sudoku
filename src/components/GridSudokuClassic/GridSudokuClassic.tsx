import React from 'react';
import classnames from 'classnames';

import { IGridSudokuClassicProps } from './GridSudokuClassic.types';
import styles from './GridSudokuClassic.module.scss';

export const GridSudokuClassic: React.FC<IGridSudokuClassicProps> = ({
    className,
    selected,
    board,
    solution,
    clueCells,
    errorCells,
    checkMode,
    onCellUpdate,
}) => {
    if (!board || !solution) {
        return null;
    }

    console.log(checkMode);

    return (
        <div className={classnames(styles.Grid, className)}>
            {board.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((val, j) => {
                        const cell = [i, j].join(' ');

                        const clue = clueCells.has(cell);
                        const error = errorCells.has(cell);
                        const correct = val && !clue && !error;

                        return (
                            <div
                                key={i * row.length + j}
                                className={classnames(
                                    styles.Cell,
                                    !checkMode && val === 0 && styles.empty,
                                    !checkMode && val && val === selected && styles.selected,
                                    checkMode && clue && styles.clue,
                                    checkMode && error && styles.error,
                                    checkMode && correct && styles.correct
                                )}
                                onClick={!clueCells.has(cell) ? () => onCellUpdate(i, j) : undefined}
                            >
                                {val || ''}
                            </div>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
};
