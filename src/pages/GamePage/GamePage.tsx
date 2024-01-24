import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Board, Coordinate } from '@/App.types';
import { getDeepCopy } from '@/algorithms/common';
import { createNewGame } from '@/algorithms/SudokuClassic';
import { Button, GameButtonRow, GridSudokuClassic } from '@/components';
import { Level, levelToClues } from './GamePage.const';
import styles from './GamePage.module.scss';
import { PATHS } from '@/App.const';

export const GamePage: React.FC = () => {
    const navigate = useNavigate();

    const [level, setLevel] = useState(Level.INSANE);
    const cluesCount = levelToClues[level];

    const [board, setBoard] = useState<Board | undefined>();
    const [solution, setSolution] = useState<Board | undefined>();

    const [selectedCell, setSelectedCell] = useState<Coordinate | undefined>();
    const [hintCell, setHintCell] = useState<Coordinate | undefined>();

    const [clueCells, setClueCells] = useState<Set<string>>(new Set());
    const [errorCells, setErrorCells] = useState<Set<string>>(new Set());

    const [checkMode, setCheckMode] = useState<boolean>(false);

    const updateBoard = (val: number) => {
        if (!selectedCell || !solution) {
            return;
        }

        const [r, c] = selectedCell;

        const _board = getDeepCopy(board);
        _board[r][c] = val;

        const _errorCells = new Set<string>(errorCells);
        const cell = [r, c].join(' ');

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
                    console.log(i, j);
                }
            }
        }

        setBoard(_board);
        setErrorCells(new Set());
        setCheckMode(false);
    };

    useEffect(() => startNewGame(), [startNewGame]);

    const handleSelectCell = (cell: Coordinate) => {
        const [r, c] = cell;

        if (selectedCell?.[0] === r && selectedCell?.[1] === c) {
            setSelectedCell(undefined);
        } else {
            setSelectedCell([r, c]);
        }
    };

    const triggerCheckMode = () => {
        if (checkMode) {
            return;
        }

        setCheckMode(true);
        setTimeout(() => setCheckMode(false), 3000);
    };

    const showHint = () => {
        if (!board) {
            return;
        }

        const emptyCells: Coordinate[] = [];

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === 0) {
                    emptyCells.push([i, j]);
                }
            }
        }

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const [r, c] = emptyCells[randomIndex];

        setHintCell([r, c]);
        setTimeout(() => setHintCell(undefined), 3000);
    };

    return (
        <div className={styles.Container}>
            <div className={styles.Body}>
                <GridSudokuClassic
                    className={styles.Board}
                    board={board}
                    selectedCell={selectedCell}
                    hintCell={hintCell}
                    onSelectCell={handleSelectCell}
                    solution={solution}
                    clueCells={clueCells}
                    errorCells={errorCells}
                    checkMode={checkMode}
                />
                <GameButtonRow
                    className={styles.GameButtonRow}
                    onSetValue={updateBoard}
                    clickable={Boolean(selectedCell)}
                />
            </div>
            <div className={styles.Menu}>
                <Button onClick={() => navigate(PATHS.HOME)}>Home</Button>
                <Button onClick={restartGame}>Restart</Button>
                <Button onClick={triggerCheckMode}>Check</Button>
                <Button onClick={showHint}>Hint</Button>
            </div>
        </div>
    );
};
