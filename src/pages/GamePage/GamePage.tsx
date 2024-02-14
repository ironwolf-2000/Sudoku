import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/app';
import { Coordinate } from '@/app/types';
import styles from './GamePage.module.scss';

import { GameControls, SudokuGridHeader, SudokuGrid } from './components';
import { GameStatus } from './const';
import {
    resetHintCell,
    resetSelectedCell,
    resetSelectedValue,
    setBoard,
    setSelectedCell,
    setSelectedValue,
    setSolution,
    updateCellNotes,
    updateCellValue,
} from '@/features/gameGrid';
import { createNewGame } from '@/algorithms';
import { setCheckCount, setHintCount } from '@/features/gameControls';
import { Card } from '@/components';
import { LayoutType } from '@/app/const';
import { useLayoutType, useOutsideClick } from '@/app/hooks';
import { INITIAL_CLUE_COUNT } from '@/algorithms/const';

export const GamePage: React.FC = () => {
    const dispatch = useDispatch();
    const layoutType = useLayoutType();

    const { withNotes } = useSelector((state: RootState) => state.gameControls);
    const { board, solution, selectedCell } = useSelector((state: RootState) => state.gameGrid);
    const { level, initialCheckCount, initialHintCount, sudokuType, boardSize } = useSelector(
        (state: RootState) => state.gameSettings
    );

    const emptyCells = useMemo(() => {
        const emptyCells: Coordinate[] = [];

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j].val === 0) {
                    emptyCells.push([i, j]);
                }
            }
        }

        return emptyCells;
    }, [board]);

    const gameStatus = useMemo(() => {
        if (board.length === 0 || emptyCells.length > 0) {
            return GameStatus.PENDING;
        }

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j].val !== solution[i][j].val) {
                    return GameStatus.FAILURE;
                }
            }
        }

        return GameStatus.SUCCESS;
    }, [board, emptyCells.length, solution]);

    const startNewGame = useCallback(() => {
        const [board, solution] = createNewGame(
            sudokuType,
            boardSize,
            INITIAL_CLUE_COUNT[sudokuType][boardSize][level - 1]
        );

        dispatch(setBoard(board));
        dispatch(setSolution(solution));
        dispatch(setCheckCount(initialCheckCount));
        dispatch(setHintCount(initialHintCount));
    }, [boardSize, dispatch, initialCheckCount, initialHintCount, level, sudokuType]);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    const handleSetCell = useCallback(
        (cell: Coordinate) => {
            dispatch(resetHintCell());

            const [r, c] = cell;

            if (board[r][c].val === 0) {
                dispatch(resetSelectedValue());
            } else {
                dispatch(setSelectedValue(board[r][c].val));
            }

            dispatch(setSelectedCell(cell));
        },
        [board, dispatch]
    );

    const handleSetValue = useCallback(
        (val: number) => {
            if (!selectedCell || board[selectedCell[0]][selectedCell[1]].clue || val > board.length) {
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
        [board, dispatch, selectedCell, withNotes]
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
