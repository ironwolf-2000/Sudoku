import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Score.module.scss';
import { RootState } from '@/app';
import { updateGameScore } from '@/features/gameHeader';

export const Score: React.FC = () => {
    const dispatch = useDispatch();
    const { gameScore, gameScoreChange } = useSelector((state: RootState) => state.gameHeader);

    const [gameScoreChangeVisible, setGameScoreChangeVisible] = useState(false);

    useEffect(() => {
        if (gameScoreChange) {
            setGameScoreChangeVisible(false);

            const timeoutId1 = setTimeout(() => {
                dispatch(updateGameScore());
                setGameScoreChangeVisible(true);
            }, 100);

            const timeoutId2 = setTimeout(() => {
                setGameScoreChangeVisible(false);
            }, 1300);

            return () => {
                clearTimeout(timeoutId1);
                clearTimeout(timeoutId2);
            };
        }
    }, [dispatch, gameScoreChange]);

    return (
        <div className={styles.Score}>
            <span className={styles.PrimaryLabel}>{String(gameScore).padStart(5, '0')}</span>
            {gameScoreChangeVisible && <span className={styles.ChangeLabel}>+{gameScoreChange}</span>}
        </div>
    );
};
