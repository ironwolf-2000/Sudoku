import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Icon, Modal, Stars } from '@/components';
import { restartGame } from '@/features/gameGrid';
import { PATHS } from '@/app/const';
import home from '@/assets/icons/home.svg';
import restart from '@/assets/icons/restart.svg';
import styles from './SudokuGridHeader.module.scss';

export const SudokuGridHeader: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [quitModalVisible, setQuitModalVisible] = useState(false);
    const [restartModalVisible, setRestartModalVisible] = useState(false);

    const handleModalApply = (quit: boolean) => {
        dispatch(restartGame());

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
                        withTitle
                        onClick={() => setQuitModalVisible(true)}
                        label="Go to main page"
                    />
                    <Icon
                        className={styles.IconButton}
                        src={restart}
                        withTitle
                        onClick={() => setRestartModalVisible(true)}
                        label="Restart game"
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
