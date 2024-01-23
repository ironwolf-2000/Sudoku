import classnames from 'classnames';

import { IButtonProps } from './Button.types';
import styles from './Button.module.scss';

export const Button: React.FC<IButtonProps> = ({ className, children, size = 'm', onClick }) => {
    return (
        <button className={classnames(styles.Button, styles[`size_${size}`], className)} onClick={onClick}>
            {children}
        </button>
    );
};
