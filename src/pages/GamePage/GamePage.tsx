import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/app';
import { Coordinate } from '@/app/types';
import styles from './GamePage.module.scss';
import { GameControls, SudokuGridHeader, SudokuGrid } from './components';
import { GameStatus } from './const';
import {
    addCompletedBox,
    addCompletedColumn,
    addCompletedDiagonal,
    addCompletedRow,
    resetHintCell,
    resetSelectedCell,
    resetSelectedValue,
    setGrid,
    setSelectedCell,
    setSelectedValue,
    setSolution,
    updateCellNotes,
    updateCellValue,
} from '@/features/gameGrid';
import { createNewGame } from '@/algorithms';
import { setCheckCount, setHintCount } from '@/features/gameControls';
import { Card } from '@/components';
import { LayoutType, SudokuType } from '@/app/const';
import { useLayoutType, useOutsideClick } from '@/app/hooks';
import { getBoxIndex, getCompletedDiagonalIndices, isBoxCompleted, isColumnCompleted, isRowCompleted } from './helpers';
import { setGameScoreChange } from '@/features/gameHeader';

export const GamePage: React.FC = () => {
    const dispatch = useDispatch();
    const layoutType = useLayoutType();

    const { withNotes } = useSelector((state: RootState) => state.gameControls);
    const {
        grid,
        solution,
        selectedCell,
        lastSetCell,
        completedBoxes,
        completedRows,
        completedColumns,
        completedDiagonals,
    } = useSelector((state: RootState) => state.gameGrid);
    const { initialCheckCount, initialHintCount, initialClueCount, sudokuType, gridSize } = useSelector(
        (state: RootState) => state.mainSetup
    );

    const emptyCells = useMemo(() => {
        const emptyCells: Coordinate[] = [];

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                if (grid[i][j].val === 0) {
                    emptyCells.push([i, j]);
                }
            }
        }

        return emptyCells;
    }, [grid]);

    const gameStatus = useMemo(() => {
        if (grid.length === 0 || emptyCells.length > 0) {
            return GameStatus.PENDING;
        }

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                if (grid[i][j].val !== solution[i][j].val) {
                    return GameStatus.FAILURE;
                }
            }
        }

        return GameStatus.SUCCESS;
    }, [grid, emptyCells.length, solution]);

    const startNewGame = useCallback(() => {
        const [grid, solution] = createNewGame(sudokuType, gridSize, initialClueCount[sudokuType][gridSize]);

        dispatch(setGrid(grid));
        dispatch(setSolution(solution));
        dispatch(setCheckCount(initialCheckCount));
        dispatch(setHintCount(initialHintCount));
    }, [sudokuType, gridSize, initialClueCount, dispatch, initialCheckCount, initialHintCount]);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    useEffect(() => {
        if (!lastSetCell) {
            return;
        }

        const [r, c] = lastSetCell;
        if (grid[r][c].clue) {
            return;
        }

        let comboCount = 0;

        if (isBoxCompleted(grid, r, c)) {
            const index = getBoxIndex(grid.length, r, c);

            if (!completedBoxes.includes(index)) {
                dispatch(addCompletedBox(index));
                comboCount++;
            }
        }

        if (isRowCompleted(grid, r)) {
            const index = r;

            if (!completedRows.includes(index)) {
                dispatch(addCompletedRow(index));
                comboCount++;
            }
        }

        if (isColumnCompleted(grid, c)) {
            const index = c;

            if (!completedColumns.includes(index)) {
                dispatch(addCompletedColumn(index));
                comboCount++;
            }
        }

        if (sudokuType === SudokuType.DIAGONAL) {
            for (const index of getCompletedDiagonalIndices(grid, r, c)) {
                if (!completedDiagonals.includes(index)) {
                    dispatch(addCompletedDiagonal(index));
                    comboCount++;
                }
            }
        }

        if (comboCount) {
            dispatch(setGameScoreChange(2 ** comboCount * 100));
        }
    }, [completedBoxes, completedColumns, completedDiagonals, completedRows, dispatch, grid, lastSetCell, sudokuType]);

    const handleSetCell = useCallback(
        (cell: Coordinate) => {
            dispatch(resetHintCell());

            const [r, c] = cell;

            if (grid[r][c].val === 0) {
                dispatch(resetSelectedValue());
            } else {
                dispatch(setSelectedValue(grid[r][c].val));
            }

            dispatch(setSelectedCell(cell));
        },
        [grid, dispatch]
    );

    const handleSetValue = useCallback(
        (val: number) => {
            if (!selectedCell) {
                return;
            }

            const [r, c] = selectedCell;
            if (grid[r][c].clue || val > grid.length) {
                return;
            }

            if (!withNotes) {
                dispatch(updateCellValue(val));
                dispatch(setSelectedValue(val));
            } else {
                dispatch(updateCellNotes(val));
                dispatch(resetSelectedValue());
            }
        },
        [grid, dispatch, selectedCell, withNotes]
    );

    const handleOutsideClick = () => {
        dispatch(resetHintCell());
        dispatch(resetSelectedCell());
        dispatch(resetSelectedValue());
    };

    const contentRef = useOutsideClick<HTMLDivElement>(handleOutsideClick);

    const gameControlsProps = {
        gameStatus,
        emptyCells,
        onSetValue: handleSetValue,
    };

    return (
        <Card className={styles.GamePage}>
            <div className={styles.Content} ref={contentRef}>
                <div>
                    <SudokuGridHeader gameStatus={gameStatus} />
                    <SudokuGrid gameStatus={gameStatus} onSelectCell={handleSetCell} onSetValue={handleSetValue} />
                    {layoutType === LayoutType.MOBILE && <GameControls {...gameControlsProps} />}
                </div>
                {layoutType === LayoutType.DESKTOP && <GameControls {...gameControlsProps} />}
            </div>
        </Card>
    );
};
