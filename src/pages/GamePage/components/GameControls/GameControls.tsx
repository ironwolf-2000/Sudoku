import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { RootState } from '@/app';
import { Icon } from '@/components';
import { DigitButtons } from '..';
import { GameStatus } from '../../const';
import styles from './GameControls.module.scss';
import { IGameControlsProps } from './types';
import eraser from '@/assets/icons/eraser.svg';
import hint from '@/assets/icons/hint.svg';
import check from '@/assets/icons/check.svg';
import notes from '@/assets/icons/notes.svg';
import notesOutline from '@/assets/icons/notes_outline.svg';
import { decrementCheckCount, decrementHintCount, toggleWithNotes } from '@/features/gameControls';
import { useLayoutType } from '@/app/hooks';
import { LayoutType } from '@/app/const';
import { clearBoardErrors, resetSelectedValue, setHintCell, updateCellValue } from '@/features/gameGrid';
import { randomChoice } from '@/algorithms/helpers';

export const GameControls: React.FC<IGameControlsProps> = ({ gameStatus, onSetValue, emptyCells }) => {
    const dispatch = useDispatch();
    const layoutType = useLayoutType();

    const { initialWithNotes, boardSize } = useSelector((state: RootState) => state.gameSettings);
    const { checkCount, hintCount, withNotes, gamePaused } = useSelector((state: RootState) => state.gameControls);
    const { board, selectedCell, hintCell } = useSelector((state: RootState) => state.gameGrid);

    const [hoveredIcon, setHoveredIcon] = useState('');

    const handleIconHover = (label: string) => {
        if (layoutType === LayoutType.DESKTOP) {
            setHoveredIcon(label);
        }
    };

    const handleIconHoverEnd = () => {
        if (layoutType === LayoutType.DESKTOP) {
            setHoveredIcon('');
        }
    };

    const handleCheckBoard = () => {
        dispatch(clearBoardErrors());
        dispatch(decrementCheckCount());
    };

    const handleShowHint = () => {
        if (gameStatus === GameStatus.SUCCESS || hintCell) {
            return;
        }

        dispatch(setHintCell(randomChoice(emptyCells)));
        dispatch(decrementHintCount());
    };

    const handleErase = () => {
        if (!selectedCell || board[selectedCell[0]][selectedCell[1]].clue) {
            return;
        }

        dispatch(updateCellValue(0));
        dispatch(resetSelectedValue());
    };

    const icons = [
        {
            badge: String(checkCount),
            disabled: gameStatus === GameStatus.SUCCESS || checkCount === 0,
            label: 'check',
            onClick: !gamePaused ? handleCheckBoard : undefined,
            src: check,
        },
        {
            badge: String(hintCount),
            disabled: gameStatus === GameStatus.SUCCESS || hintCount === 0 || emptyCells.length === 0,
            label: 'hint',
            onClick: !gamePaused ? handleShowHint : undefined,
            src: hint,
        },
        {
            badge: withNotes ? 'on' : 'off',
            disabled: gameStatus === GameStatus.SUCCESS || !initialWithNotes,
            label: 'notes',
            onClick: !gamePaused ? () => dispatch(toggleWithNotes()) : undefined,
            src: withNotes ? notes : notesOutline,
        },
        {
            disabled: gameStatus === GameStatus.SUCCESS,
            label: 'erase',
            onClick: !gamePaused ? handleErase : undefined,
            src: eraser,
        },
    ];

    return (
        <div className={styles.GameControls}>
            <div className={styles.ActionButtonContainer}>
                {icons.map(({ label, ...props }) => (
                    <Icon
                        key={label}
                        className={classnames(styles.ActionButton, gamePaused && styles.disabled)}
                        label={label}
                        withCaption
                        captionVisible={layoutType === LayoutType.MOBILE || hoveredIcon === label}
                        onHover={() => handleIconHover(label)}
                        onHoverEnd={handleIconHoverEnd}
                        {...props}
                    />
                ))}
            </div>
            <DigitButtons count={boardSize} gameStatus={gameStatus} onSetValue={onSetValue} />
        </div>
    );
};
