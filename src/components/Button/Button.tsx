import classNames from 'classnames';

import { IButtonProps } from './Button.types';
import styles from './Button.module.scss';

export const Button: React.FC<IButtonProps> = ({ children, size = 'm', onClick }) => {
    return (
        <button className={classNames(styles.Button, styles[`size_${size}`])} onClick={onClick}>
            {children}
        </button>
    );
};
