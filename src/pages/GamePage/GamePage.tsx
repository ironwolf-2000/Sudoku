import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/app';
import { Coordinate } from '@/app/types';
import styles from './GamePage.module.scss';

import { GameControls, SudokuGridHeader, SudokuGrid } from './components';
import { GameStatus, CHECK_MODE_TIMEOUT } from './const';
import {
    setBoard,
    setCheckMode,
    setHintCell,
    setSelectedCell,
    setSelectedValue,
    setSolution,
} from '@/features/gameGrid';
import { createNewGame } from '@/algorithms';
import { decrementCheckCount, decrementHintCount, setCheckCount, setHintCount } from '@/features/gameControls';
import { Card } from '@/components';
import { LayoutType } from '@/app/const';
import { useLayoutType, useOutsideClick } from '@/app/hooks';

export const GamePage: React.FC = () => {
    const dispatch = useDispatch();
    const layoutType = useLayoutType();

    const { level, initialCheckCount, initialHintCount, sudokuType, boardSize } = useSelector(
        (state: RootState) => state.gameSettings
    );

    const { board, solution, selectedValue, selectedCell, hintCell, checkMode } = useSelector(
        (state: RootState) => state.gameGrid
    );

    const cluesCount = useMemo(() => {
        const total = boardSize ** 2;

        if (level >= 1 && level <= 3) {
            return total - 3 ** level;
        }

        if (level === 4) {
            return 35;
        }

        if (level === 5) {
            return 24;
        }

        return total;
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
        const [board, solution] = createNewGame(sudokuType, cluesCount);

        dispatch(setBoard(board));
        dispatch(setSolution(solution));
        dispatch(setCheckCount(initialCheckCount));
        dispatch(setHintCount(initialHintCount));
    }, [cluesCount, dispatch, initialCheckCount, initialHintCount, sudokuType]);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    const handleSelectCell = (cell: Coordinate) => {
        dispatch(setHintCell(undefined));

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
        setTimeout(() => dispatch(setCheckMode(false)), CHECK_MODE_TIMEOUT);
        dispatch(decrementCheckCount());
    };

    const showHint = () => {
        if (checkMode || hintCell) {
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
            dispatch(decrementHintCount());
        }
    };

    const handleOutsideClick = () => {
        dispatch(setHintCell(undefined));
        dispatch(setSelectedCell(undefined));
        dispatch(setSelectedValue(undefined));
    };

    const contentRef = useOutsideClick<HTMLDivElement>(handleOutsideClick);

    const gameControlsProps = {
        gameStatus,
        selectedCell,
        selectedValue,
        onSelectValue: handleSelectValue,
        onTriggerCheckMode: triggerCheckMode,
        onShowHint: showHint,
    };

    return (
        <Card className={styles.GamePage}>
            <div className={styles.Content} ref={contentRef}>
                <div>
                    <SudokuGridHeader gameStatus={gameStatus} />
                    <SudokuGrid gameStatus={gameStatus} errorCells={errorCells} onSelectCell={handleSelectCell} />
                    {layoutType === LayoutType.MOBILE && <GameControls {...gameControlsProps} />}
                </div>
                {layoutType === LayoutType.DESKTOP && <GameControls {...gameControlsProps} />}
            </div>
        </Card>
    );
};
