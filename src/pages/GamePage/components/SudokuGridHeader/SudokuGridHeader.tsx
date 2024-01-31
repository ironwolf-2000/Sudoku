import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Icon, Modal, Stars } from '@/components';
import { restartGame, setHintCell } from '@/features/gameGrid';
import { setCheckCount, setHintCount } from '@/features/gameControls';
import { PATHS } from '@/app/const';
import home from '@/assets/icons/home.svg';
import restart from '@/assets/icons/restart.svg';
import styles from './SudokuGridHeader.module.scss';
import { RootState } from '@/app';

export const SudokuGridHeader: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { initialCheckCount, initialHintCount } = useSelector((state: RootState) => state.gameSettings);

    const [quitModalVisible, setQuitModalVisible] = useState(false);
    const [restartModalVisible, setRestartModalVisible] = useState(false);

    const handleModalApply = (quit: boolean) => {
        dispatch(restartGame());
        dispatch(setHintCell(undefined));
        dispatch(setCheckCount(initialCheckCount));
        dispatch(setHintCount(initialHintCount));

        if (quit) {
            setQuitModalVisible(false);
            navigate(PATHS.MAIN);
        } else {
            setRestartModalVisible(false);
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
                <div className={styles.Time}>0:00</div>
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
