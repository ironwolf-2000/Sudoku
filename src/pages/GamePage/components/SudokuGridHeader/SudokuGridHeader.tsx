import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { GAME_TIMEOUT, MODAL_DATA, ModalType } from './const';
import { getFormattedTime } from './helpers';

export const SudokuGridHeader: React.FC<ISudokuGridHeaderProps> = ({ gameStatus }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { initialCheckCount, initialHintCount } = useSelector((state: RootState) => state.gameSettings);
    const { gamePaused } = useSelector((state: RootState) => state.gameControls);

    const [modalVisible, setModalVisible] = useState<Record<ModalType, boolean>>({
        [ModalType.QUIT]: false,
        [ModalType.RESTART]: false,
        [ModalType.TIME_OVER]: false,
    });

    const [gameTime, setGameTime] = useState(0);
    const gameTimeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const handleModalOpen = useCallback(
        (modalType: ModalType) => {
            setModalVisible(prev => ({ ...prev, [modalType]: true }));

            if (!gamePaused) {
                dispatch(toggleGamePaused());
            }
        },
        [dispatch, gamePaused]
    );

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

    useEffect(() => {
        if (!gamePaused && gameStatus !== GameStatus.SUCCESS) {
            gameTimeTimeoutRef.current = setTimeout(() => setGameTime(gameTime + 1), 1000);

            if (gameTime >= GAME_TIMEOUT) {
                handleModalOpen(ModalType.TIME_OVER);
            }
        }

        return () => clearTimeout(gameTimeTimeoutRef.current);
    }, [gameTime, gamePaused, gameStatus, handleModalOpen]);

    const formattedGameTime = useMemo(() => {
        return getFormattedTime(gameTime);
    }, [gameTime]);

    return (
        <>
            <div className={styles.SudokuGridHeader}>
                <div className={styles.ButtonContainer}>
                    <Icon
                        className={styles.IconButton}
                        src={home}
                        title="Quit the game"
                        label="home"
                        size="s"
                        onClick={() => handleModalOpen(ModalType.QUIT)}
                    />
                    <Icon
                        className={styles.IconButton}
                        src={restart}
                        title="Restart the game"
                        label="restart"
                        size="s"
                        onClick={() => handleModalOpen(ModalType.RESTART)}
                    />
                </div>
                <Stars className={styles.Stars} size="s" />
                <div className={styles.Time}>
                    <span>{formattedGameTime}</span>
                    <Icon
                        src={gamePaused ? play : pause}
                        label="pause"
                        size="s"
                        disabled={gameStatus === GameStatus.SUCCESS}
                        onClick={() => dispatch(toggleGamePaused())}
                    />
                </div>
            </div>
            {MODAL_DATA.map(({ modalType, title, applyButtonLabel, text }) => (
                <Modal
                    key={modalType}
                    visible={modalVisible[modalType]}
                    title={title}
                    applyButtonLabel={applyButtonLabel}
                    onApply={() => handleModalClose(modalType, true)}
                    onClose={modalType != ModalType.TIME_OVER ? () => handleModalClose(modalType, false) : undefined}
                >
                    {text}
                </Modal>
            ))}
        </>
    );
};
