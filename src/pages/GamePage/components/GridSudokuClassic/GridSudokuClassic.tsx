import React from 'react';
import classnames from 'classnames';

import { IGridSudokuClassicProps } from './types';
import { useCellsClassNames, useGridClassNames } from './hooks';
import { GameStatus } from '../../const';
import { Coordinate } from '@/app/types';

export const GridSudokuClassic: React.FC<IGridSudokuClassicProps> = ({
    className,
    selectedValue,
    selectedCell,
    hintCell,
    onSelectCell,
    gameStatus,
    board,
    solution,
    clueCells,
    errorCells,
    checkMode,
}) => {
    const gridClassNames = useGridClassNames(gameStatus, checkMode, className);
    const cellsClassNames = useCellsClassNames(
        gameStatus,
        clueCells,
        errorCells,
        checkMode,
        selectedCell,
        hintCell,
        selectedValue,
        board
    );

    const success = gameStatus === GameStatus.SUCCESS;

    if (!board || !solution) {
        return null;
    }

    const handleCellClick = (cell: Coordinate) => {
        if (!success && !checkMode && !clueCells.has(cell.join(' '))) {
            onSelectCell(cell);
        }
    };

    return (
        <div className={classnames(gridClassNames)}>
            {board.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((val, j) => (
                        <div
                            key={i * row.length + j}
                            className={classnames(cellsClassNames[i][j])}
                            onClick={() => handleCellClick([i, j])}
                        >
                            {val || (hintCell?.[0] === i && hintCell?.[1] === j && solution[i][j])}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
};
