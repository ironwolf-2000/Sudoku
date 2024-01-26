import React from 'react';
import classnames from 'classnames';

import { IGridSudokuClassicProps } from './GridSudokuClassic.types';
import styles from './GridSudokuClassic.module.scss';
import { getCoordinatesFromBox } from './GridSudokuClassic.helpers';

export const GridSudokuClassic: React.FC<IGridSudokuClassicProps> = ({
    className,
    selectedValue,
    selectedCell,
    hintCell,
    onSelectCell,
    board,
    solution,
    clueCells,
    errorCells,
    checkMode,
}) => {
    if (!board || !solution) {
        return null;
    }

    return (
        <div className={classnames(styles.Grid, className)}>
            {board.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((val, j) => {
                        const cell = [i, j].join(' ');

                        const clue = clueCells.has(cell);
                        const error = errorCells.has(cell);
                        const correct = val && !clue && !error;

                        const selected = selectedCell?.[0] === i && selectedCell?.[1] === j;
                        const hint = hintCell?.[0] === i && hintCell?.[1] === j;

                        const sameRow = selectedCell?.[0] === i;
                        const sameColumn = selectedCell?.[1] === j;
                        const sameBox = selectedCell && getCoordinatesFromBox(selectedCell).has(cell);

                        return (
                            <div
                                key={i * row.length + j}
                                className={classnames(
                                    styles.Cell,
                                    (sameRow || sameColumn || sameBox) && styles.affected,
                                    (selected || val === selectedValue) && styles.selected,
                                    hint && styles.hint,
                                    clue && styles.clue,
                                    error && styles.error,
                                    correct && styles.correct,
                                    checkMode && styles.checkMode
                                )}
                                onClick={!checkMode && !clueCells.has(cell) ? () => onSelectCell([i, j]) : undefined}
                            >
                                {val || (hint && solution[hintCell[0]][hintCell[1]])}
                            </div>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
};
