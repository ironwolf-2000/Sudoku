import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Score.module.scss';
import { RootState } from '@/app';
import { increaseGameScore } from '@/features/gameHeader';
import { SudokuType } from '@/app/const';
import { IScoreProps } from './types';

export const Score: React.FC<IScoreProps> = ({ coefficient }) => {
    const dispatch = useDispatch();

    const { sudokuType } = useSelector((state: RootState) => state.mainSetup);
    const { gameScore } = useSelector((state: RootState) => state.gameHeader);
    const { completedBoxesStr, completedRowsStr, completedColumnsStr, completedDiagonalsStr } = useSelector(
        (state: RootState) => state.gameGrid
    );

    const boxCount = completedBoxesStr.length;
    const rowCount = completedRowsStr.length;
    const columnCount = completedColumnsStr.length;
    const diagonalCount = completedDiagonalsStr.length;

    const [completedCount, setCompletedCount] = useState(0);

    useEffect(() => {
        let newCompletedCount = boxCount + rowCount + columnCount;

        if (sudokuType === SudokuType.DIAGONAL) {
            newCompletedCount += diagonalCount;
        }

        if (newCompletedCount === 0) {
            setCompletedCount(0);
            return;
        }

        const combo = newCompletedCount - completedCount;

        if (combo) {
            const scoreChange = 2 ** combo * coefficient;

            dispatch(increaseGameScore(scoreChange));
            setCompletedCount(newCompletedCount);
        }
    }, [boxCount, rowCount, columnCount, diagonalCount, completedCount, dispatch, sudokuType, coefficient]);

    return (
        <div className={styles.Score}>
            <span className={styles.Label}>{String(gameScore).padStart(4, '0')}</span>
        </div>
    );
};
