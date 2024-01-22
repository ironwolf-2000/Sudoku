import React from 'react';
import classnames from 'classnames';

import { IGridSudokuClassicProps } from './GridSudokuClassic.types';
import styles from './GridSudokuClassic.module.scss';

export const GridSudokuClassic: React.FC<IGridSudokuClassicProps> = ({ className, board, solution }) => {
    return (
        <div className={classnames(styles.Grid, className)}>
            {board.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((val, j) => (
                        <div key={i * row.length + j} className={classnames(styles.Cell, val === 0 && styles.empty)}>
                            {val || ''}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
};
