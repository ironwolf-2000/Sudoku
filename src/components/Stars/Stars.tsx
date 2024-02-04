import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { RootState } from '@/app';
import { TOTAL_LEVEL_COUNT } from '@/app/const';
import { setLevel } from '@/features/gameSettings';
import starFilled from '@/assets/icons/star_filled.svg';
import starEmpty from '@/assets/icons/star_empty.svg';
import { Icon } from '..';
import { IStarsProps } from './types';
import styles from './Stars.module.scss';

export const Stars: React.FC<IStarsProps> = ({ className, interactive, size = 'm' }) => {
    const { level } = useSelector((state: RootState) => state.gameSettings);
    const dispatch = useDispatch();

    const [hoveredCount, setHoveredCount] = useState(0);

    return (
        <div className={classnames(styles.Stars, !interactive && styles.nonInteractive, className)}>
            {Array(TOTAL_LEVEL_COUNT)
                .fill(null)
                .map((_, i) => {
                    const filled = i < (hoveredCount || level);
                    let extraProps = {};

                    if (interactive) {
                        extraProps = {
                            onHover: () => setHoveredCount(i + 1),
                            onHoverEnd: () => setHoveredCount(0),
                            onClick: () => dispatch(setLevel(i + 1)),
                        };
                    }

                    return (
                        <Icon
                            key={i}
                            src={filled ? starFilled : starEmpty}
                            size={size}
                            label={filled ? 'filled star' : 'empty star'}
                            {...extraProps}
                        />
                    );
                })}
        </div>
    );
};
