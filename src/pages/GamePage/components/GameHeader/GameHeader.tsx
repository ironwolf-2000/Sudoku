import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Icon, Modal, Stars } from '@/components';
import { restartGame } from '@/features/gameGrid';
import { PATHS } from '@/app/const';
import home from '@/assets/icons/home.svg';
import restart from '@/assets/icons/restart.svg';
import styles from './GameHeader.module.scss';

export const GameHeader: React.FC = () => {
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
            <div className={styles.GameHeader}>
                <Icon src={home} withTitle onClick={() => setQuitModalVisible(true)} label="Go to main page" />
                <Icon src={restart} withTitle onClick={() => setRestartModalVisible(true)} label="Restart game" />
                <Stars />
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
