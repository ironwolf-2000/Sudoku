import classnames from 'classnames';

import { IIconProps } from './types';
import styles from './Icon.module.scss';

export const Icon: React.FC<IIconProps> = ({
    src,
    disabled,
    size = 'm',
    title,
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
        <button
            className={classnames(styles.Icon, disabled && styles.disabled, className)}
            onMouseOver={onHover}
            onMouseLeave={onHoverEnd}
            onClick={onClick}
            aria-label={label}
            title={title}
        >
            <div className={styles.Content}>
                {badge && <span className={classnames(styles.Badge, styles[`size_${size}`])}>{badge}</span>}
                <img className={classnames(styles.Image, styles[`size_${size}`])} src={src} alt={label} />
            </div>
            {withCaption && (
                <span className={classnames(styles.Caption, (disabled || !captionVisible) && styles.hidden)}>
                    {label}
                </span>
            )}
        </button>
    );
};
