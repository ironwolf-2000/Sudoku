import { useCallback, useEffect, useState } from 'react';

import { Board } from '@/App.types';
import { getDeepCopy } from '@/algorithms/common';
import { createNewGame } from '@/algorithms/SudokuClassic';
import { Button, GameButtonRow, GridSudokuClassic } from '@/components';
import { Level, levelToClues } from './GamePage.const';
import styles from './GamePage.module.scss';

export const GamePage: React.FC = () => {
    const [level, setLevel] = useState(Level.INSANE);
    const cluesCount = levelToClues[level];

    const [board, setBoard] = useState<Board | undefined>();
    const [solution, setSolution] = useState<Board | undefined>();

    const [clueCells, setClueCells] = useState<Set<string>>(new Set());
    const [errorCells, setErrorCells] = useState<Set<string>>(new Set());
    const [selectedValue, setSelectedValue] = useState<number | undefined>();

    const [checkMode, setCheckMode] = useState<boolean>(false);

    const updateBoard = (r: number, c: number) => {
        if (!selectedValue || !solution) {
            return;
        }

        const _board = getDeepCopy(board);
        _board[r][c] = selectedValue;

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

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    const triggerCheckMode = () => {
        if (checkMode) {
            return;
        }

        setCheckMode(true);
        setTimeout(() => setCheckMode(false), 3000);
    };

    return (
        <div className={styles.Container}>
            <div className={styles.Body}>
                <GridSudokuClassic
                    className={styles.Board}
                    selected={selectedValue}
                    board={board}
                    solution={solution}
                    clueCells={clueCells}
                    errorCells={errorCells}
                    checkMode={checkMode}
                    onCellUpdate={updateBoard}
                />
                <GameButtonRow
                    className={styles.GameButtonRow}
                    selectedValue={selectedValue}
                    onSelectValue={val => setSelectedValue(val === selectedValue ? 0 : val)}
                />
            </div>
            <div className={styles.Menu}>
                <Button className={styles.ButtonNewGame} onClick={startNewGame}>
                    New Game
                </Button>
                <Button className={styles.ButtonCheck} onClick={triggerCheckMode}>
                    Check
                </Button>
            </div>
        </div>
    );
};
