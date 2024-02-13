import classnames from 'classnames';
import { useSelector } from 'react-redux';

import { IIconProps } from './types';
import styles from './Icon.module.scss';
import { RootState } from '@/app';

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
    const { withOverlay } = useSelector((state: RootState) => state.appSettings);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            onClick?.();
        }
    };

    return (
        <span
            className={classnames(styles.Icon, disabled && styles.disabled, styles[`size_${size}`], className)}
            onMouseOver={onHover}
            onMouseLeave={onHoverEnd}
            onClick={onClick}
            aria-label={label}
            title={title}
            role="button"
            tabIndex={onClick && !withOverlay ? 0 : -1}
            onKeyDown={handleKeyDown}
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
