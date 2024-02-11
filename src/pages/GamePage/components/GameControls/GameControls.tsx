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
import pencil from '@/assets/icons/pencil.svg';
import { toggleWithNotes } from '@/features/gameControls';
import { useLayoutType } from '@/app/hooks';
import { LayoutType } from '@/app/const';
import { resetSelectedValue, setSelectedValue, updateCellNotes, updateCellValue } from '@/features/gameGrid';

export const GameControls: React.FC<IGameControlsProps> = ({
    gameStatus,
    onTriggerCheckMode,
    onShowHint,
    emptyCells,
}) => {
    const dispatch = useDispatch();
    const layoutType = useLayoutType();

    const { initialWithNotes, boardSize } = useSelector((state: RootState) => state.gameSettings);
    const { checkCount, hintCount, withNotes, gamePaused } = useSelector((state: RootState) => state.gameControls);
    const { board, selectedCell } = useSelector((state: RootState) => state.gameGrid);

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

    const handleSetValue = (val: number) => {
        if (!selectedCell || board[selectedCell[0]][selectedCell[1]].clue) {
            return;
        }

        if (!withNotes) {
            dispatch(updateCellValue(val));
            dispatch(setSelectedValue(val));
        } else {
            dispatch(updateCellNotes(val));
            dispatch(resetSelectedValue());
        }
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
            onClick: !gamePaused ? onTriggerCheckMode : undefined,
            src: check,
        },
        {
            badge: String(hintCount),
            disabled: gameStatus === GameStatus.SUCCESS || hintCount === 0 || emptyCells.length === 0,
            label: 'hint',
            onClick: !gamePaused ? onShowHint : undefined,
            src: hint,
        },
        {
            badge: withNotes ? 'on' : 'off',
            disabled: gameStatus === GameStatus.SUCCESS || !initialWithNotes,
            label: 'notes',
            onClick: !gamePaused ? () => dispatch(toggleWithNotes()) : undefined,
            src: pencil,
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
            <DigitButtons count={boardSize} gameStatus={gameStatus} onSetValue={handleSetValue} />
        </div>
    );
};
