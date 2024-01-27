import classnames from 'classnames';

import { IIconProps } from './types';
import styles from './Icon.module.scss';

export const Icon: React.FC<IIconProps> = ({ src, label, size = 'm', onClick }) => {
    return (
        <button className={styles.Container} onClick={onClick} aria-label={label} title={label}>
            <img className={classnames(styles.Icon, styles[`size_${size}`])} src={src} alt={label} />
        </button>
    );
};
