import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Icon, Modal, Stars } from '@/components';
import { restartGame, setHintCell } from '@/features/gameGrid';
import { setCheckCount, setHintCount, toggleGamePaused } from '@/features/gameControls';
import { PATHS } from '@/app/const';
import home from '@/assets/icons/home.svg';
import restart from '@/assets/icons/restart.svg';
import pause from '@/assets/icons/pause.svg';
import play from '@/assets/icons/play.svg';
import styles from './SudokuGridHeader.module.scss';
import { RootState } from '@/app';

export const SudokuGridHeader: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { initialCheckCount, initialHintCount } = useSelector((state: RootState) => state.gameSettings);
    const { gamePaused } = useSelector((state: RootState) => state.gameControls);

    const [quitModalVisible, setQuitModalVisible] = useState(false);
    const [restartModalVisible, setRestartModalVisible] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    const gameTimeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (!gamePaused) {
            gameTimeTimeoutRef.current = setTimeout(() => setGameTime(gameTime + 1), 1000);
        }

        return () => clearTimeout(gameTimeTimeoutRef.current);
    }, [gameTime, gamePaused]);

    const formattedGameTime = useMemo(() => {
        const minutes = Math.floor(gameTime / 60);
        const seconds = gameTime % 60;

        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    }, [gameTime]);

    const handleModalApply = (quit: boolean) => {
        dispatch(restartGame());
        dispatch(setHintCell(undefined));
        dispatch(setCheckCount(initialCheckCount));
        dispatch(setHintCount(initialHintCount));

        if (gamePaused) {
            dispatch(toggleGamePaused());
        }

        if (quit) {
            setQuitModalVisible(false);
            navigate(PATHS.MAIN);
        } else {
            setRestartModalVisible(false);
            setGameTime(0);
        }
    };

    return (
        <>
            <div className={styles.SudokuGridHeader}>
                <div className={styles.ButtonContainer}>
                    <Icon
                        className={styles.IconButton}
                        src={home}
                        onClick={() => setQuitModalVisible(true)}
                        title="Go to main page"
                    />
                    <Icon
                        className={styles.IconButton}
                        src={restart}
                        onClick={() => setRestartModalVisible(true)}
                        title="Restart game"
                    />
                </div>
                <Stars className={styles.Stars} />
                <div className={styles.Time}>
                    <span>{formattedGameTime}</span>
                    <Icon src={gamePaused ? play : pause} size="s" onClick={() => dispatch(toggleGamePaused())} />
                </div>
            </div>
            <Modal
                visible={quitModalVisible}
                applyButtonLabel="Leave"
                onApply={() => handleModalApply(true)}
                onClose={() => setQuitModalVisible(false)}
            >
                Are you sure you want to quit the game?
            </Modal>
            <Modal
                visible={restartModalVisible}
                applyButtonLabel="Restart"
                onApply={() => handleModalApply(false)}
                onClose={() => setRestartModalVisible(false)}
            >
                Are you sure you want to restart the game?
            </Modal>
        </>
    );
};
