import { useRef } from 'react';
import classnames from 'classnames';

import { ISliderProps } from './types';
import styles from './Slider.module.scss';
import { useSliderItemWidth } from './hooks';

export const Slider: React.FC<ISliderProps> = ({ items, selectedIndex, sliderItemClass }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const itemWidth = useSliderItemWidth(sliderRef, items.length);

    return (
        <div className={styles.Slider} ref={sliderRef}>
            <div
                className={styles.Thumb}
                style={{
                    width: `calc((100% - 1rem) / ${items.length})`,
                    transform: `translateX(calc(${selectedIndex} * 100%))`,
                }}
            />
            {items.map(({ label }, index) => (
                <button
                    key={label}
                    style={{ width: itemWidth }}
                    className={classnames(
                        styles.SliderItem,
                        selectedIndex === index && styles.selected,
                        sliderItemClass
                    )}
                    onClick={() => items[index].onItemClick?.(index)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};
