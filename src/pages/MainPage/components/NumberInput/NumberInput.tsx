import { useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';

import styles from './NumberInput.module.scss';
import { INumberInputProps } from './types';

export const NumberInput: React.FC<INumberInputProps> = ({ min, max, value, onChange }) => {
    const timeoutRef = useRef<NodeJS.Timeout>();
    const buttonMinusRef = useRef<HTMLButtonElement>(null);
    const buttonPlusRef = useRef<HTMLButtonElement>(null);

    const getValidValue = useCallback(
        (value: number) => {
            return Math.max(Math.min(value, max), min);
        },
        [max, min]
    );

    const handleHold = (sign: number, delta = 1, time = 500) => {
        onChange(getValidValue(value + sign * delta));

        timeoutRef.current = setTimeout(() => {
            handleHold(sign, delta + 1, Math.max(Math.floor(time / 1.5), 100));
        }, time);
    };

    const handleMouseUp = () => {
        clearTimeout(timeoutRef.current);
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
            setTimeout(() => onChange(min), 200);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Enter') {
                return;
            }

            if (document.activeElement === buttonMinusRef.current) {
                onChange(getValidValue(value - 1));
            } else if (document.activeElement === buttonPlusRef.current) {
                onChange(getValidValue(value + 1));
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [getValidValue, onChange, value]);

    return (
        <div className={styles.NumberInput}>
            <button
                ref={buttonMinusRef}
                className={classnames(styles.Button, styles.left)}
                onMouseDown={() => handleHold(-1)}
                onMouseUp={handleMouseUp}
            >
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
            <button
                ref={buttonPlusRef}
                className={classnames(styles.Button, styles.right)}
                onMouseDown={() => handleHold(1)}
                onMouseUp={handleMouseUp}
            >
                <span>+</span>
            </button>
        </div>
    );
};
