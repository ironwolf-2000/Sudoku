import { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import { RootState } from '@/app';
import { Icon } from '@/components';
import { DigitButtons } from '..';
import { GameStatus } from '../../const';
import styles from './GameControls.module.scss';
import { IGameControlsProps } from './types';
import eraser from '@/assets/icons/eraser.svg';
import hint from '@/assets/icons/hint.svg';
import doubleCheck from '@/assets/icons/double_check.svg';

export const GameControls: React.FC<IGameControlsProps> = ({
    gameStatus,
    onSelectValue,
    onShowHint,
    onErase,
    onTriggerCheckMode,
    onUpdateBoard,
    selectedCell,
    selectedValue,
}) => {
    const { checksCount, hintsCount } = useSelector((state: RootState) => state.gameControls);

    const icons = [
        {
            badge: String(checksCount),
            disabled: checksCount === 0,
            label: 'check',
            onClick: onTriggerCheckMode,
            src: doubleCheck,
            withCaption: true,
        },
        {
            badge: String(hintsCount),
            disabled: hintsCount === 0,
            label: 'hint',
            onClick: onShowHint,
            src: hint,
            withCaption: true,
        },
        { src: eraser, onClick: onErase, label: 'eraser', withCaption: true },
    ];

    const [hovered, setHovered] = useState<string | undefined>();

    return (
        <div className={styles.GameControls}>
            <div className={styles.Header}>
                {icons.map(({ label, ...props }) => (
                    <Icon
                        key={label}
                        className={styles.HeaderButton}
                        onHover={() => setHovered(label)}
                        onHoverEnd={() => setHovered(undefined)}
                        label={label}
                        captionVisible={hovered === label}
                        {...props}
                    />
                ))}
            </div>
            <DigitButtons
                className={styles.DigitButtons}
                valueSetting={Boolean(selectedCell)}
                selectedValue={selectedValue}
                onSetValue={onUpdateBoard}
                onSelectValue={onSelectValue}
            />
            {gameStatus === GameStatus.SUCCESS && (
                <p className={classnames(styles.InfoLabel, styles.success)}>
                    You've successfully completed the puzzle!
                </p>
            )}
            {gameStatus === GameStatus.FAILURE && (
                <p className={classnames(styles.InfoLabel, styles.failure)}>You've made some mistakes!</p>
            )}
        </div>
    );
};
