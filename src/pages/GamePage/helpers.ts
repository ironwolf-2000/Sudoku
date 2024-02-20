import {
    getCoordinatesFromCurrentBox,
    getCoordinatesFromCurrentColumn,
    getCoordinatesFromCurrentRow,
} from '@/algorithms/helpers';
import { Grid } from '@/app/types';

export const getBoxIndex = (gridSize: number, r0: number, c0: number) => {
    const perfectSquare = gridSize === 4 || gridSize === 9;
    const rowCount = perfectSquare ? Math.floor(Math.sqrt(gridSize)) : 2;
    const columnCount = perfectSquare ? rowCount : Math.floor(gridSize / 2);

    return Math.floor(r0 / rowCount) * Math.floor(gridSize / columnCount) + Math.floor(c0 / columnCount);
};

export const isBoxCompleted = (grid: Grid, r0: number, c0: number) => {
    const values = new Set();

    for (const [r, c] of getCoordinatesFromCurrentBox(grid.length, r0, c0)) {
        if (grid[r][c].val) {
            values.add(grid[r][c].val);
        }
    }

    return values.size === grid.length;
};

export const isRowCompleted = (grid: Grid, r0: number) => {
    const values = new Set();

    for (const [r, c] of getCoordinatesFromCurrentRow(grid.length, r0)) {
        if (grid[r][c].val) {
            values.add(grid[r][c].val);
        }
    }

    return values.size === grid.length;
};

export const isColumnCompleted = (grid: Grid, c0: number) => {
    const values = new Set();

    for (const [r, c] of getCoordinatesFromCurrentColumn(grid.length, c0)) {
        if (grid[r][c].val) {
            values.add(grid[r][c].val);
        }
    }

    return values.size === grid.length;
};

export const getCompletedDiagonalIndices = (grid: Grid, r0: number, c0: number) => {
    const res: number[] = [];

    if (r0 === c0) {
        const values = new Set();

        for (let i = 0; i < grid.length; i++) {
            if (grid[i][i].val) {
                values.add(grid[i][i].val);
            }
        }

        if (values.size === grid.length) {
            res.push(0);
        }
    }

    if (r0 + c0 === grid.length - 1) {
        const values = new Set();

        for (let i = 0; i < grid.length; i++) {
            if (grid[i][grid.length - 1 - i].val) {
                values.add(grid[i][grid.length - 1 - i].val);
            }
        }

        if (values.size === grid.length) {
            res.push(1);
        }
    }

    return res;
};
