import { Coordinate } from '@/app/App.types';

export const getCoordinatesFromBox = (cell: Coordinate): Set<string> => {
    const [r0, c0] = cell.map(x => Math.floor(x / 3) * 3);
    const res = new Set<string>();

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            res.add([r0 + i, c0 + j].join(' '));
        }
    }

    return res;
};
