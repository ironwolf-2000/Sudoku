import classnames from 'classnames';

import styles from './NumberInput.module.scss';
import { INumberInputProps } from './types';

export const NumberInput: React.FC<INumberInputProps> = ({ min, max, value, onChange }) => {
    const getValidValue = (value: number) => {
        return Math.max(Math.min(value, max), min);
    };

    const handleClick = (value: number) => {
        onChange(getValidValue(value));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);

        if (isNaN(value)) {
            return;
        }

        if (value > max) {
            onChange(getValidValue(value));
        } else {
            onChange(value);
        }
    };

    const handleInputBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);

        if (value < min) {
            onChange(min);
        }
    };

    return (
        <div className={styles.NumberInput}>
            <button className={classnames(styles.Button, styles.left)} onClick={() => handleClick(value - 1)}>
                <span className={styles.Minus}>-</span>
            </button>
            <input
                className={styles.Input}
                aria-label="number input for clues"
                value={value || ''}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                tabIndex={-1}
            />
            <button className={classnames(styles.Button, styles.right)} onClick={() => handleClick(value + 1)}>
                <span>+</span>
            </button>
        </div>
    );
};
