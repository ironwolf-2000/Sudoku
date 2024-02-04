import { useLayoutEffect, useState } from 'react';
import { LAPTOP_BREAKPOINT, LayoutType } from './const';

export const useLayoutType = (): LayoutType => {
    const [windowSize, setWindowSize] = useState(0);

    const handleSize = () => {
        setWindowSize(window.innerWidth);
    };

    useLayoutEffect(() => {
        handleSize();

        window.addEventListener('resize', handleSize);

        return () => window.removeEventListener('resize', handleSize);
    }, []);

    return windowSize < LAPTOP_BREAKPOINT ? LayoutType.MOBILE : LayoutType.DESKTOP;
};
