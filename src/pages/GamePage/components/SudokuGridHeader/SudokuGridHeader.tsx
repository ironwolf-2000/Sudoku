import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Icon, Modal, Stars } from '@/components';
import { restartGame, setHintCell, setSelectedValue } from '@/features/gameGrid';
import { setCheckCount, setHintCount, toggleGamePaused } from '@/features/gameControls';
import { PATHS } from '@/app/const';
import home from '@/assets/icons/home.svg';
import restart from '@/assets/icons/restart.svg';
import pause from '@/assets/icons/pause.svg';
import play from '@/assets/icons/play.svg';
import styles from './SudokuGridHeader.module.scss';
import { RootState } from '@/app';
import { GameStatus } from '../../const';
import { ISudokuGridHeaderProps } from './types';
import { ModalType } from './const';

export const SudokuGridHeader: React.FC<ISudokuGridHeaderProps> = ({ gameStatus }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { initialCheckCount, initialHintCount } = useSelector((state: RootState) => state.gameSettings);
    const { gamePaused } = useSelector((state: RootState) => state.gameControls);

    const [modalVisible, setModalVisible] = useState<Record<ModalType, boolean>>({
        [ModalType.QUIT]: false,
        [ModalType.RESTART]: false,
    });

    const [gameTime, setGameTime] = useState(0);
    const gameTimeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (!gamePaused && gameStatus !== GameStatus.SUCCESS) {
            gameTimeTimeoutRef.current = setTimeout(() => setGameTime(gameTime + 1), 1000);
        }

        return () => clearTimeout(gameTimeTimeoutRef.current);
    }, [gameTime, gamePaused, gameStatus]);

    const formattedGameTime = useMemo(() => {
        const minutes = Math.floor(gameTime / 60);
        const seconds = gameTime % 60;

        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    }, [gameTime]);

    const handleModalOpen = (modalType: ModalType) => {
        setModalVisible(prev => ({ ...prev, [modalType]: true }));

        if (!gamePaused) {
            dispatch(toggleGamePaused());
        }
    };

    const handleModalClose = (modalType: ModalType, apply: boolean) => {
        if (gamePaused) {
            dispatch(toggleGamePaused());
        }

        setModalVisible(prev => ({ ...prev, [modalType]: false }));

        if (apply) {
            dispatch(restartGame());
            dispatch(setHintCell(undefined));
            dispatch(setSelectedValue(undefined));
            dispatch(setCheckCount(initialCheckCount));
            dispatch(setHintCount(initialHintCount));
            setGameTime(0);

            if (modalType === ModalType.QUIT) {
                navigate(PATHS.MAIN);
            }
        }
    };

    const modalData = [
        {
            modalType: ModalType.QUIT,
            applyLabel: 'Quit',
            title: 'Quit the game?',
            text: 'You will lose the progress in the current game.',
        },
        {
            modalType: ModalType.RESTART,
            applyLabel: 'Restart',
            title: 'Restart the game?',
            text: 'You will start the same sudoku board from the beginning.',
        },
    ] as const;

    return (
        <>
            <div className={styles.SudokuGridHeader}>
                <div className={styles.ButtonContainer}>
                    <Icon
                        className={styles.IconButton}
                        src={home}
                        onClick={() => handleModalOpen(ModalType.QUIT)}
                        title="Quit the game"
                    />
                    <Icon
                        className={styles.IconButton}
                        src={restart}
                        onClick={() => handleModalOpen(ModalType.RESTART)}
                        title="Restart the game"
                    />
                </div>
                <Stars className={styles.Stars} />
                <div className={styles.Time}>
                    <span>{formattedGameTime}</span>
                    <Icon
                        src={gamePaused ? play : pause}
                        size="s"
                        disabled={gameStatus === GameStatus.SUCCESS}
                        onClick={() => dispatch(toggleGamePaused())}
                    />
                </div>
            </div>
            {modalData.map(({ modalType, applyLabel, title, text }) => (
                <Modal
                    key={modalType}
                    visible={modalVisible[modalType]}
                    title={title}
                    applyButtonLabel={applyLabel}
                    onApply={() => handleModalClose(modalType, true)}
                    onClose={() => handleModalClose(modalType, false)}
                >
                    {text}
                </Modal>
            ))}
        </>
    );
};
