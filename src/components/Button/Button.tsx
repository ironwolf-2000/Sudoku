import classnames from 'classnames';

import { IButtonProps } from './types';
import styles from './Button.module.scss';

export const Button: React.FC<IButtonProps> = ({ className, children, disabled, onClick }) => {
    return (
        <button
            className={classnames(styles.Button, disabled && styles.disabled, className)}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
