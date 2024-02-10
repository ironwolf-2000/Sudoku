import { useSelector } from 'react-redux';
import classnames from 'classnames';

import { RootState } from '@/app';
import { IDigitButtonsProps } from './types';
import styles from './DigitButtons.module.scss';
import { getInclusiveRange } from '@/algorithms/helpers';
import { GameStatus } from '../../const';

export const DigitButtons: React.FC<IDigitButtonsProps> = ({
    className,
    count,
    gameStatus,
    selectedValue,
    valueSetting,
    onSetValue,
    onSelectValue,
}) => {
    const { gamePaused } = useSelector((state: RootState) => state.gameControls);
    const disabled = gamePaused || gameStatus === GameStatus.SUCCESS;

    const handleClick = (val: number) => {
        if (valueSetting) {
            onSetValue(val);
        } else {
            onSelectValue(val);
        }
    };

    return (
        <div className={classnames(styles.DigitButtons, styles[`count_${count}`], className)}>
            {getInclusiveRange(1, count).map(val => (
                <button
                    key={val}
                    className={classnames(
                        styles.Button,
                        selectedValue === val && styles.selected,
                        disabled && styles.disabled,
                        styles[`count_${count}`]
                    )}
                    disabled={disabled}
                    onClick={() => handleClick(val)}
                >
                    {val}
                </button>
            ))}
        </div>
    );
};
