import { useSelector } from 'react-redux';
import classnames from 'classnames';

import { RootState } from '@/app';
import { IDigitButtonsProps } from './types';
import styles from './DigitButtons.module.scss';
import { getInclusiveRange } from '@/algorithms/helpers';

export const DigitButtons: React.FC<IDigitButtonsProps> = ({
    className,
    count,
    selectedValue,
    valueSetting,
    onSetValue,
    onSelectValue,
}) => {
    const { gamePaused } = useSelector((state: RootState) => state.gameControls);

    const handleClick = (val: number) => {
        if (gamePaused) {
            return;
        }

        if (valueSetting) {
            onSetValue(val);
        } else {
            onSelectValue(val);
        }
    };

    return (
        <div className={classnames(styles.DigitButtons, className)}>
            {getInclusiveRange(1, count).map(val => (
                <button
                    key={val}
                    className={classnames(
                        styles.Button,
                        selectedValue === val && styles.selected,
                        gamePaused && styles.disabled
                    )}
                    onClick={() => handleClick(val)}
                >
                    {val}
                </button>
            ))}
        </div>
    );
};
