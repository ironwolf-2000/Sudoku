import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Icon, Modal } from '@/components';
import { resetHintCell, resetSelectedValue, restartGame } from '@/features/gameGrid';
import { setCheckCount, setHintCount, toggleGamePaused, toggleWithNotes } from '@/features/gameControls';
import { LayoutType, PATHS } from '@/app/const';
import leave from '@/assets/icons/leave.svg';
import restart from '@/assets/icons/restart.svg';
import pause from '@/assets/icons/pause.svg';
import play from '@/assets/icons/play.svg';
import styles from './SudokuGridHeader.module.scss';
import { RootState } from '@/app';
import { GameStatus } from '../../const';
import { ISudokuGridHeaderProps } from './types';
import { GAME_TIMEOUT, MODAL_DATA, ModalType } from './const';
import { getFormattedTime } from './helpers';
import { useLayoutType } from '@/app/hooks';

export const SudokuGridHeader: React.FC<ISudokuGridHeaderProps> = ({ gameStatus }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { initialCheckCount, initialHintCount } = useSelector((state: RootState) => state.gameSettings);
    const { gamePaused, withNotes } = useSelector((state: RootState) => state.gameControls);

    const layoutType = useLayoutType();

    const [currentModalType, setCurrentModalType] = useState<ModalType | null>(null);

    const [gameTime, setGameTime] = useState(0);
    const gameTimeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const handleModalOpen = useCallback(
        (modalType: ModalType) => {
            setCurrentModalType(modalType);

            if (!gamePaused) {
                dispatch(toggleGamePaused());
            }
        },
        [dispatch, gamePaused]
    );

    const handleModalClose = useCallback(() => {
        if (!currentModalType) {
            return;
        }

        if (gamePaused) {
            dispatch(toggleGamePaused());
        }

        setCurrentModalType(null);
    }, [currentModalType, dispatch, gamePaused]);

    const handleModalApply = useCallback(() => {
        handleModalClose();

        dispatch(restartGame());
        dispatch(resetHintCell());
        dispatch(resetSelectedValue());
        dispatch(setCheckCount(initialCheckCount));
        dispatch(setHintCount(initialHintCount));
        setGameTime(0);

        if (withNotes) {
            dispatch(toggleWithNotes());
        }

        if (currentModalType === ModalType.LEAVE) {
            navigate(PATHS.MAIN, { replace: true });
        }
    }, [currentModalType, dispatch, handleModalClose, initialCheckCount, initialHintCount, navigate, withNotes]);

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

    const handleTimeClick = () => {
        if (gameStatus !== GameStatus.SUCCESS) {
            dispatch(toggleGamePaused());
        }
    };

    return (
        <>
            <div className={styles.SudokuGridHeader}>
                <div className={styles.ButtonContainer}>
                    <Icon
                        className={styles.IconButton}
                        src={leave}
                        title="Quit the game"
                        label="leave"
                        onClick={() => handleModalOpen(ModalType.LEAVE)}
                    />
                    <Icon
                        className={styles.IconButton}
                        src={restart}
                        title="Restart the game"
                        label="restart"
                        onClick={() => handleModalOpen(ModalType.RESTART)}
                    />
                </div>
                <div className={styles.Time} onClick={layoutType === LayoutType.MOBILE ? handleTimeClick : undefined}>
                    <span>{formattedGameTime}</span>
                    <Icon
                        src={gamePaused || gameStatus === GameStatus.SUCCESS ? play : pause}
                        label={gamePaused || gameStatus === GameStatus.SUCCESS ? 'play' : 'pause'}
                        onClick={layoutType === LayoutType.DESKTOP ? handleTimeClick : undefined}
                        size="s"
                    />
                </div>
            </div>
            {MODAL_DATA.map(({ modalType, title, applyButtonLabel, text, withCloseButton }) => (
                <Modal
                    key={modalType}
                    visible={modalType === currentModalType}
                    title={title}
                    applyButtonLabel={applyButtonLabel}
                    onApply={handleModalApply}
                    onClose={withCloseButton ? handleModalClose : undefined}
                >
                    {text}
                </Modal>
            ))}
        </>
    );
};
