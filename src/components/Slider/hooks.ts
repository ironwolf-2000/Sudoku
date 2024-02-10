import { RefObject, useEffect, useState } from 'react';

export const useSliderItemWidth = (sliderRef: RefObject<HTMLDivElement>, itemCount: number): number => {
    const [itemWidth, setItemWidth] = useState(0);

    useEffect(() => {
        if (sliderRef.current) {
            setItemWidth(Math.floor(sliderRef.current.offsetWidth / itemCount));
        }
    }, [itemCount, sliderRef]);

    return itemWidth;
};
