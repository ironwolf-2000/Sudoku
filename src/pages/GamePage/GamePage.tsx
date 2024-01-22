import { useState } from 'react';

import { Button, GridSudokuClassic } from '@/components';
import styles from './GamePage.module.scss';
import { generateSudoku } from '@/algorithms/common';

export const GamePage: React.FC = () => {
    const [board, setBoard] = useState(generateSudoku(9));

    const startNewGame = () => {
        setBoard(generateSudoku(9));
    };

    return (
        <div className={styles.Container}>
            <GridSudokuClassic className={styles.Board} board={board} solution={board} />
            <Button onClick={startNewGame}>New Game</Button>
        </div>
    );
};
