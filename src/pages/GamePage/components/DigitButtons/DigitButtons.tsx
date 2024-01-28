import classnames from 'classnames';

import { getInclusiveRange } from '@/algorithms/common';
import { IDigitButtonsProps } from './types';
import styles from './DigitButtons.module.scss';

export const DigitButtons: React.FC<IDigitButtonsProps> = ({
    className,
    count = 9,
    selectedValue,
    valueSetting,
    onSetValue,
    onSelectValue,
}) => {
    return (
        <div className={classnames(styles.DigitButtons, className)}>
            {getInclusiveRange(1, count).map(val => (
                <button
                    key={val}
                    className={classnames(styles.Button, selectedValue === val && styles.selected)}
                    onClick={valueSetting ? () => onSetValue(val) : () => onSelectValue(val)}
                >
                    {val}
                </button>
            ))}
        </div>
    );
};
