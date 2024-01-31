import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/app';
import { Coordinate } from '@/app/types';
import styles from './GamePage.module.scss';

import { decrementChecksCount, decrementHintsCount } from '@/features/gameControls';
import { GameControls, SudokuGridHeader, SudokuGrid } from './components';
import { GameStatus, HINT_TIMEOUT, LAPTOP_BREAKPOINT } from './const';
import {
    setBoard,
    setCheckMode,
    setHintCell,
    setSelectedCell,
    setSelectedValue,
    setSolution,
} from '@/features/gameGrid';
import { createNewGame } from '@/algorithms/SudokuClassic';
import { useWindowSize } from './hooks';

export const GamePage: React.FC = () => {
    const dispatch = useDispatch();
    const { width: windowWidth } = useWindowSize();
    const { boardSize, level } = useSelector((state: RootState) => state.gameSettings);

    const { board, solution, selectedValue, selectedCell, hintCell, checkMode } = useSelector(
        (state: RootState) => state.gameGrid
    );

    const cluesCount = useMemo(() => {
        const total = boardSize ** 2;

        return level >= 1 && level <= 5 ? total - level * 2 : total;
    }, [boardSize, level]);

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

    const errorCells = useMemo(() => {
        const errorCells: Coordinate[] = [];

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j].val !== 0 && board[i][j].val !== solution[i][j].val) {
                    errorCells.push([i, j]);
                }
            }
        }

        return errorCells;
    }, [board, solution]);

    const gameStatus = useMemo(() => {
        if (emptyCells.length > 0) {
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

    useEffect(() => {
        const [board, solution] = createNewGame(cluesCount);

        dispatch(setBoard(board));
        dispatch(setSolution(solution));
        dispatch(setCheckMode(false));
    }, [cluesCount, dispatch]);

    const handleSelectCell = (cell: Coordinate) => {
        if (selectedCell?.[0] === cell[0] && selectedCell?.[1] === cell[1]) {
            dispatch(setSelectedCell(undefined));
        } else {
            dispatch(setSelectedCell(cell));
            dispatch(setSelectedValue(undefined));
        }
    };

    const handleSelectValue = (val: number) => {
        dispatch(setSelectedValue(val === selectedValue ? undefined : val));
    };

    const triggerCheckMode = () => {
        if (checkMode) {
            return;
        }

        dispatch(setCheckMode(true));
        setTimeout(() => dispatch(setCheckMode(false)), HINT_TIMEOUT);
        dispatch(decrementChecksCount());
    };

    const showHint = () => {
        if (checkMode) {
            return;
        }

        let [r, c] = [-1, -1];

        if (errorCells.length > 0) {
            [r, c] = errorCells[Math.floor(Math.random() * errorCells.length)];
        } else if (emptyCells.length > 0) {
            [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }

        if (r !== -1 && c !== -1) {
            dispatch(setHintCell([r, c]));
            setTimeout(() => dispatch(setHintCell(undefined)), HINT_TIMEOUT);
        }

        dispatch(decrementHintsCount());
    };

    return (
        <div className={styles.GamePage}>
            <div className={styles.Content}>
                <div>
                    <SudokuGridHeader />
                    <SudokuGrid
                        board={board}
                        selectedValue={selectedValue}
                        selectedCell={gameStatus !== GameStatus.SUCCESS ? selectedCell : undefined}
                        hintCell={hintCell}
                        onSelectCell={handleSelectCell}
                        solution={solution}
                        errorCells={errorCells}
                        gameStatus={gameStatus}
                        checkMode={checkMode}
                    />
                    {windowWidth < LAPTOP_BREAKPOINT && (
                        <GameControls
                            gameStatus={gameStatus}
                            onSelectValue={handleSelectValue}
                            onShowHint={showHint}
                            onTriggerCheckMode={triggerCheckMode}
                            selectedCell={selectedCell}
                            selectedValue={selectedValue}
                        />
                    )}
                </div>
                {windowWidth >= LAPTOP_BREAKPOINT && (
                    <GameControls
                        gameStatus={gameStatus}
                        onSelectValue={handleSelectValue}
                        onShowHint={showHint}
                        onTriggerCheckMode={triggerCheckMode}
                        selectedCell={selectedCell}
                        selectedValue={selectedValue}
                    />
                )}
            </div>
        </div>
    );
};
