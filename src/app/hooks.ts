import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

export const useOutsideClick = <T extends HTMLElement>(callback: () => void): React.MutableRefObject<T> => {
    const ref = useRef<T>() as React.MutableRefObject<T>;

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [callback, ref]);

    return ref;
};
