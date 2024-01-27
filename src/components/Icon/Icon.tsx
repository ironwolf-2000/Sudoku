import classnames from 'classnames';

import { IIconProps } from './types';
import styles from './Icon.module.scss';

export const Icon: React.FC<IIconProps> = ({ src, label, withTitle, onClick, className }) => {
    return (
        <button
            className={classnames(styles.Container, className)}
            onClick={onClick}
            aria-label={label}
            title={withTitle ? label : undefined}
        >
            <img className={styles.Icon} src={src} alt={label} />
        </button>
    );
};
