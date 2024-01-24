import classnames from 'classnames';

import { getInclusiveRange } from '@/algorithms/common';
import { IGameButtonRowProps } from './GameButtonRow.types';
import styles from './GameButtonRow.module.scss';

export const GameButtonRow: React.FC<IGameButtonRowProps> = ({ className, count = 9, clickable, onSetValue }) => {
    return (
        <div className={classnames(styles.Container, className)}>
            {getInclusiveRange(1, count).map(val => (
                <button
                    key={val}
                    className={classnames(styles.Button, clickable && styles.withHover)}
                    onClick={clickable ? () => onSetValue(val) : undefined}
                >
                    {val}
                </button>
            ))}
        </div>
    );
};
