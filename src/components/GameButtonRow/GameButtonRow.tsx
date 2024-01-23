import classnames from 'classnames';

import { getInclusiveRange } from '@/algorithms/common';
import { IGameButtonRowProps } from './GameButtonRow.types';
import styles from './GameButtonRow.module.scss';

export const GameButtonRow: React.FC<IGameButtonRowProps> = ({
    className,
    count = 9,
    selectedValue,
    onSelectValue,
}) => {
    return (
        <div className={classnames(styles.Container, className)}>
            {getInclusiveRange(1, count).map(val => (
                <button
                    className={classnames(styles.Button, selectedValue === val && styles.selected)}
                    onClick={() => onSelectValue(val)}
                >
                    {val}
                </button>
            ))}
        </div>
    );
};
