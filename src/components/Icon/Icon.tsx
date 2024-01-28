import classnames from 'classnames';

import { IIconProps } from './types';
import styles from './Icon.module.scss';

export const Icon: React.FC<IIconProps> = ({
    src,
    disabled,
    label,
    badge,
    withTitle,
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
            title={withTitle ? label : undefined}
        >
            {badge && <span className={styles.Badge}>{badge}</span>}
            <img className={styles.Content} src={src} alt={label} />
            {withCaption && (
                <span className={classnames(styles.Caption, (disabled || !captionVisible) && styles.hidden)}>
                    {label}
                </span>
            )}
        </button>
    );
};
