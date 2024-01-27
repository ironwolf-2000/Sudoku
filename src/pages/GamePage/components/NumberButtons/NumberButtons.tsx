import classnames from 'classnames';

import { getInclusiveRange } from '@/algorithms/common';
import { INumberButtonsProps } from './types';
import styles from './NumberButtons.module.scss';

export const NumberButtons: React.FC<INumberButtonsProps> = ({
    className,
    count = 9,
    selectedValue,
    valueSetting,
    onSetValue,
    onSelectValue,
}) => {
    return (
        <div className={classnames(styles.Container, className)}>
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
