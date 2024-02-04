import classnames from 'classnames';

import { IIconProps } from './types';
import styles from './Icon.module.scss';
import { useEffect, useState } from 'react';
import { useLayoutType } from '@/app/hooks';
import { LayoutType } from '@/app/const';

export const Icon: React.FC<IIconProps> = ({
    src,
    size = 'm',
    title,
    disabled,
    label,
    badge,
    withCaption,
    onHover,
    onHoverEnd,
    onClick,
    className,
}) => {
    const layoutType = useLayoutType();
    const [captionVisible, setCaptionVisible] = useState(false);

    useEffect(() => {
        setCaptionVisible(layoutType === LayoutType.MOBILE);
    }, [layoutType]);

    const handleMouseOver = () => {
        if (withCaption && layoutType === LayoutType.DESKTOP) {
            setCaptionVisible(true);
        }

        onHover?.();
    };

    const handleMouseLeave = () => {
        if (withCaption && layoutType === LayoutType.DESKTOP) {
            setCaptionVisible(false);
        }

        onHoverEnd?.();
    };

    return (
        <button
            className={classnames(styles.Icon, disabled && styles.disabled, styles[`size_${size}`], className)}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
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
        </button>
    );
};
