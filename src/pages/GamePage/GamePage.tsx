import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@/app';
import { Board, Coordinate } from '@/app/types';
import { getDeepCopy } from '@/algorithms/common';
import { createNewGame } from '@/algorithms/SudokuClassic';
import { Icon } from '@/components';
import styles from './GamePage.module.scss';
import { PATHS } from '@/app/const';
import home from '@/assets/icons/home.svg';
import restart from '@/assets/icons/restart.svg';
import { GameControls, GridSudokuClassic } from './components';
import { GameStatus } from './const';
import { getClueCountByLevel } from './helpers';

export const GamePage: React.FC = () => {
    const navigate = useNavigate();

    const { boardSize, level } = useSelector((state: RootState) => state.gameSettings);
    const cluesCount = getClueCountByLevel(boardSize, level);

    const [board, setBoard] = useState<Board | undefined>();
    const [solution, setSolution] = useState<Board | undefined>();

    const [selectedValue, setSelectedValue] = useState<number | undefined>();
    const [selectedCell, setSelectedCell] = useState<Coordinate | undefined>();
    const [hintCell, setHintCell] = useState<Coordinate | undefined>();

    const [clueCells, setClueCells] = useState<Set<string>>(new Set());
    const [errorCells, setErrorCells] = useState<Set<string>>(new Set());

    const emptyCells = useMemo(() => {
        if (!board) {
            return [];
        }

        const result: Coordinate[] = [];

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] === 0) {
                    result.push([i, j]);
                }
            }
        }

        return result;
    }, [board, boardSize]);

    const gameStatus = useMemo(() => {
        if (!board || !solution || emptyCells.length > 0) {
            return GameStatus.PENDING;
        }

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] !== solution[i][j]) {
                    return GameStatus.FAILURE;
                }
            }
        }

        return GameStatus.SUCCESS;
    }, [board, boardSize, emptyCells.length, solution]);

    const [checkMode, setCheckMode] = useState(false);

    const startNewGame = useCallback(() => {
        const [board, solution] = createNewGame(cluesCount);
        const _clueCells = new Set<string>();

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j]) {
                    _clueCells.add([i, j].join(' '));
                }
            }
        }

        setBoard(board);
        setSolution(solution);
        setClueCells(_clueCells);
    }, [boardSize, cluesCount]);

    const restartGame = () => {
        if (!board) {
            return;
        }

        const _board = getDeepCopy(board);

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (!clueCells.has([i, j].join(' '))) {
                    _board[i][j] = 0;
                }
            }
        }

        setBoard(_board);
        setErrorCells(new Set());
        setCheckMode(false);
    };

    useEffect(() => startNewGame(), [startNewGame]);

    const handleSelectCell = (cell: Coordinate) => {
        if (selectedCell?.[0] === cell[0] && selectedCell?.[1] === cell[1]) {
            setSelectedCell(undefined);
        } else {
            setSelectedCell(cell);
            setSelectedValue(undefined);
        }
    };

    const handleErase = () => {
        if (!selectedCell || gameStatus === GameStatus.SUCCESS) {
            return;
        }

        const _board = getDeepCopy(board);

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (i === selectedCell[0] && j === selectedCell[1]) {
                    _board[i][j] = 0;
                }
            }
        }

        setBoard(_board);
    };

    const updateBoard = (val: number) => {
        if (!selectedCell || !solution) {
            return;
        }

        const [r, c] = selectedCell;
        const cell = selectedCell.join(' ');

        const _board = getDeepCopy(board);
        _board[r][c] = val;

        const _errorCells = new Set<string>(errorCells);

        if (_board[r][c] !== solution[r][c]) {
            _errorCells.add(cell);
        } else if (_board[r][c] === solution[r][c] && errorCells.has(cell)) {
            _errorCells.delete(cell);
        }

        setBoard(_board);
        setErrorCells(_errorCells);
    };

    const handleSelectValue = (val: number) => {
        setSelectedValue(val === selectedValue ? undefined : val);
    };

    const triggerCheckMode = () => {
        if (checkMode) {
            return;
        }

        setCheckMode(true);
        setTimeout(() => setCheckMode(false), 3000);
    };

    const showHint = () => {
        if (!board || checkMode || emptyCells.length === 0) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const [r, c] = emptyCells[randomIndex];

        setHintCell([r, c]);
        setTimeout(() => setHintCell(undefined), 3000);
    };

    return (
        <div className={styles.Container}>
            <div className={styles.Content}>
                <div className={styles.Header}>
                    <Icon src={home} withTitle onClick={() => navigate(PATHS.MAIN)} label="Go to main page" />
                    <Icon src={restart} withTitle onClick={restartGame} label="Restart game" />
                </div>
                <div className={styles.Body}>
                    <GridSudokuClassic
                        board={board}
                        selectedValue={selectedValue}
                        selectedCell={gameStatus !== GameStatus.SUCCESS ? selectedCell : undefined}
                        hintCell={hintCell}
                        onSelectCell={handleSelectCell}
                        solution={solution}
                        clueCells={clueCells}
                        errorCells={errorCells}
                        gameStatus={gameStatus}
                        checkMode={checkMode}
                    />
                    <GameControls
                        gameStatus={gameStatus}
                        onSelectValue={handleSelectValue}
                        onShowHint={showHint}
                        onTriggerCheckMode={triggerCheckMode}
                        onErase={handleErase}
                        onUpdateBoard={updateBoard}
                        selectedCell={selectedCell}
                        selectedValue={selectedValue}
                    />
                </div>
            </div>
        </div>
    );
};
