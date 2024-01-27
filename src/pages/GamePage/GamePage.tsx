import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';

import { Board, Coordinate } from '@/app/App.types';
import { getDeepCopy } from '@/algorithms/common';
import { createNewGame } from '@/algorithms/SudokuClassic';
import { Button, Icon } from '@/components';
import styles from './GamePage.module.scss';
import { PATHS } from '@/app/App.const';
import home from '@/assets/icons/home.svg';
import restart from '@/assets/icons/restart.svg';
import { GridSudokuClassic, NumberButtons } from './components';
import { GameStatus, Level, levelToClues } from './GamePage.const';

export const GamePage: React.FC = () => {
    const navigate = useNavigate();

    const [level, setLevel] = useState(Level.INSANE);
    // const cluesCount = levelToClues[level];
    const cluesCount = 79;

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

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === 0) {
                    result.push([i, j]);
                }
            }
        }

        return result;
    }, [board]);

    const gameStatus = useMemo(() => {
        if (!board || !solution || emptyCells.length > 0) {
            return GameStatus.PENDING;
        }

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] !== solution[i][j]) {
                    return GameStatus.FAILURE;
                }
            }
        }

        return GameStatus.SUCCESS;
    }, [board, emptyCells.length, solution]);

    const [checkMode, setCheckMode] = useState<boolean>(false);

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

    const startNewGame = useCallback(() => {
        const [board, solution] = createNewGame(cluesCount);
        const _clueCells = new Set<string>();

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j]) {
                    _clueCells.add([i, j].join(' '));
                }
            }
        }

        setBoard(board);
        setSolution(solution);
        setClueCells(_clueCells);
    }, [cluesCount]);

    const restartGame = () => {
        if (!board) {
            return;
        }

        const _board = getDeepCopy(board);

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
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
        if (!board || emptyCells.length === 0) {
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
                    <Icon src={home} size="l" onClick={() => navigate(PATHS.MAIN)} label="Go to main page" />
                    <Icon src={restart} size="l" onClick={restartGame} label="Restart game" />
                </div>
                <div className={styles.Body}>
                    <GridSudokuClassic
                        board={board}
                        selectedValue={selectedValue}
                        selectedCell={selectedCell}
                        hintCell={hintCell}
                        onSelectCell={handleSelectCell}
                        solution={solution}
                        clueCells={clueCells}
                        errorCells={errorCells}
                        gameStatus={gameStatus}
                        checkMode={checkMode}
                    />
                    <div className={styles.Controls}>
                        <div className={styles.Menu}>
                            <Button onClick={triggerCheckMode}>Check</Button>
                            <Button onClick={showHint} disabled={emptyCells.length === 0}>
                                Hint
                            </Button>
                        </div>
                        <NumberButtons
                            className={styles.NumberButtons}
                            valueSetting={Boolean(selectedCell)}
                            selectedValue={selectedValue}
                            onSetValue={updateBoard}
                            onSelectValue={handleSelectValue}
                        />
                        {gameStatus === GameStatus.SUCCESS && (
                            <p className={classnames(styles.InfoLabel, styles.success)}>
                                You've successfully completed the puzzle!
                            </p>
                        )}
                        {gameStatus === GameStatus.FAILURE && (
                            <p className={classnames(styles.InfoLabel, styles.failure)}>You've made some mistakes!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
