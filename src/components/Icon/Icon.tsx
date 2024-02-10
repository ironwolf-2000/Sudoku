import classnames from 'classnames';

import { IIconProps } from './types';
import styles from './Icon.module.scss';

export const Icon: React.FC<IIconProps> = ({
    src,
    size = 'm',
    title,
    disabled,
    label,
    badge,
    withCaption,
    captionVisible,
    onHover,
    onHoverEnd,
    onClick,
    className,
}) => {
    return (
        <span
            className={classnames(styles.Icon, disabled && styles.disabled, styles[`size_${size}`], className)}
            onMouseOver={onHover}
            onMouseLeave={onHoverEnd}
            onClick={onClick}
            aria-label={label}
            title={title}
        >
            <div className={styles.Content}>
                {badge && <span className={classnames(styles.Badge)}>{badge}</span>}
                <img className={classnames(styles.Image)} src={src} alt={label} />
            </div>
            {withCaption && (
                <span className={classnames(styles.Caption, !captionVisible && styles.hidden)}>{label}</span>
            )}
        </span>
    );
};
