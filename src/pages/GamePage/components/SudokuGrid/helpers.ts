import { Coordinate } from '@/app/types';

export const getCoordinatesFromBox = (cell: Coordinate): Coordinate[] => {
    const [r0, c0] = cell.map(x => Math.floor(x / 3) * 3);
    const coordinates: Coordinate[] = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            coordinates.push([r0 + i, c0 + j]);
        }
    }

    return coordinates;
};
