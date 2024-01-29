import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon, Modal, Stars } from '@/components';
import { PATHS } from '@/app/const';
import home from '@/assets/icons/home.svg';
import restart from '@/assets/icons/restart.svg';
import styles from './GameHeader.module.scss';
import { IGameHeaderProps } from './types';

export const GameHeader: React.FC<IGameHeaderProps> = ({ onRestartGame }) => {
    const navigate = useNavigate();

    const [quitModalVisible, setQuitModalVisible] = useState(false);
    const handleQuitModalApply = () => {
        setQuitModalVisible(false);
        navigate(PATHS.MAIN);
    };

    const [restartModalVisible, setRestartModalVisible] = useState(false);
    const handleRestartModalApply = () => {
        setRestartModalVisible(false);
        onRestartGame();
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
                onApply={handleQuitModalApply}
                onClose={() => setQuitModalVisible(false)}
            >
                Are you sure you want to quit the game?
            </Modal>
            <Modal
                visible={restartModalVisible}
                applyButtonLabel="Restart"
                onApply={handleRestartModalApply}
                onClose={() => setRestartModalVisible(false)}
            >
                Are you sure you want to restart the game?
            </Modal>
        </>
    );
};
