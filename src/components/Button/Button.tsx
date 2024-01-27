import classnames from 'classnames';

import { IButtonProps } from './types';
import styles from './Button.module.scss';

export const Button: React.FC<IButtonProps> = ({ className, children, size = 'm', disabled, onClick }) => {
    return (
        <button
            className={classnames(styles.Button, styles[`size_${size}`], disabled && styles.disabled, className)}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
