import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/app';
import { Icon } from '@/components';
import { DigitButtons } from '..';
import { GameStatus, LAPTOP_BREAKPOINT } from '../../const';
import styles from './GameControls.module.scss';
import { IGameControlsProps } from './types';
import eraser from '@/assets/icons/eraser.svg';
import hint from '@/assets/icons/hint.svg';
import doubleCheck from '@/assets/icons/double_check.svg';
import { updateSelectedBoardCell } from '@/features/gameGrid';
import { useWindowSize } from '../../hooks';

export const GameControls: React.FC<IGameControlsProps> = ({
    gameStatus,
    onSelectValue,
    onShowHint,
    onTriggerCheckMode,
    selectedCell,
    selectedValue,
}) => {
    const { width: windowWidth } = useWindowSize();
    const dispatch = useDispatch();
    const { checksCount, hintsCount } = useSelector((state: RootState) => state.gameControls);

    const icons = [
        {
            badge: String(checksCount),
            disabled: gameStatus === GameStatus.SUCCESS || checksCount === 0,
            label: 'check',
            onClick: onTriggerCheckMode,
            src: doubleCheck,
            withCaption: true,
        },
        {
            badge: String(hintsCount),
            disabled: gameStatus === GameStatus.SUCCESS || hintsCount === 0,
            label: 'hint',
            onClick: onShowHint,
            src: hint,
            withCaption: true,
        },
        {
            disabled: gameStatus === GameStatus.SUCCESS,
            label: 'erase',
            onClick: () => dispatch(updateSelectedBoardCell(0)),
            src: eraser,
            withCaption: true,
        },
    ];

    const [hovered, setHovered] = useState<string | undefined>();
    const narrowScreen = windowWidth < LAPTOP_BREAKPOINT;

    return (
        <div className={styles.GameControls}>
            <div className={styles.ActionButtonContainer}>
                {icons.map(({ label, ...props }) => (
                    <Icon
                        key={label}
                        className={styles.ActionButton}
                        onHover={!narrowScreen ? () => setHovered(label) : undefined}
                        onHoverEnd={!narrowScreen ? () => setHovered(undefined) : undefined}
                        label={label}
                        captionVisible={narrowScreen || hovered === label}
                        {...props}
                    />
                ))}
            </div>
            <DigitButtons
                className={styles.DigitButtons}
                valueSetting={Boolean(selectedCell)}
                selectedValue={selectedValue}
                onSetValue={val => dispatch(updateSelectedBoardCell(val))}
                onSelectValue={onSelectValue}
            />
        </div>
    );
};
