import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Grid, Coordinate } from '@/app/types';

interface GameGridState {
    grid: Grid;
    solution: Grid;
    selectedValue?: number;
    selectedCell?: Coordinate;
    hintCell?: Coordinate;
    lastSetCell?: Coordinate;
    completedBoxes: number[];
    completedRows: number[];
    completedColumns: number[];
    completedDiagonals: number[];
}

const initialState: GameGridState = {
    grid: [],
    solution: [],
    completedBoxes: [],
    completedRows: [],
    completedColumns: [],
    completedDiagonals: [],
};

export const gameGridSlice = createSlice({
    name: 'gameGrid',
    initialState,
    reducers: {
        setGrid: (state, action: PayloadAction<Grid>) => {
            state.grid = action.payload;
        },
        setSolution: (state, action: PayloadAction<Grid>) => {
            state.solution = action.payload;
        },
        setSelectedValue: (state, action: PayloadAction<number>) => {
            state.selectedValue = action.payload;
        },
        resetSelectedValue: state => {
            state.selectedValue = undefined;
        },
        setSelectedCell: (state, action: PayloadAction<Coordinate>) => {
            state.selectedCell = action.payload;
        },
        resetSelectedCell: state => {
            state.selectedCell = undefined;
        },
        setHintCell: (state, action: PayloadAction<Coordinate>) => {
            state.hintCell = action.payload;
        },
        resetHintCell: state => {
            state.hintCell = undefined;
        },
        restartGame: state => {
            for (let i = 0; i < state.grid.length; i++) {
                for (let j = 0; j < state.grid.length; j++) {
                    if (!state.grid[i][j].clue) {
                        state.grid[i][j] = { val: 0, notes: [] };
                    }
                }
            }

            state.selectedCell = undefined;
            state.completedBoxes = [];
            state.completedRows = [];
            state.completedColumns = [];
            state.completedDiagonals = [];
        },
        clearGridErrors: state => {
            for (let i = 0; i < state.grid.length; i++) {
                for (let j = 0; j < state.grid.length; j++) {
                    if (state.grid[i][j].val && state.grid[i][j].val !== state.solution[i][j].val) {
                        state.grid[i][j] = { val: 0, notes: [] };
                    }
                }
            }
        },
        updateCellValue: (state, action: PayloadAction<number>) => {
            if (!state.selectedCell) {
                return;
            }

            const [r, c] = state.selectedCell;
            const val = action.payload;

            if (!state.grid[r][c].clue) {
                state.grid[r][c] = { val, notes: [] };
                state.lastSetCell = [r, c];
            }
        },
        updateCellNotes: (state, action: PayloadAction<number>) => {
            if (!state.selectedCell) {
                return;
            }

            const val = action.payload;
            const [r, c] = state.selectedCell;

            if (state.grid[r][c].clue) {
                return;
            }

            const itemIndex = state.grid[r][c].notes.indexOf(val);

            if (itemIndex === -1) {
                state.grid[r][c].notes.push(val);
            } else {
                state.grid[r][c].notes.splice(itemIndex, 1);
            }

            state.grid[r][c].val = 0;
        },
        addCompletedBox: (state, action: PayloadAction<number>) => {
            const index = action.payload;

            if (!state.completedBoxes.includes(index)) {
                state.completedBoxes.push(index);
            }
        },
        resetCompletedBoxes: state => {
            state.completedBoxes = [];
        },
        addCompletedRow: (state, action: PayloadAction<number>) => {
            const index = action.payload;

            if (!state.completedRows.includes(index)) {
                state.completedRows.push(index);
            }
        },
        resetCompletedRows: state => {
            state.completedRows = [];
        },
        addCompletedColumn: (state, action: PayloadAction<number>) => {
            const index = action.payload;

            if (!state.completedColumns.includes(index)) {
                state.completedColumns.push(index);
            }
        },
        resetCompletedColumns: state => {
            state.completedColumns = [];
        },
        addCompletedDiagonal: (state, action: PayloadAction<number>) => {
            const index = action.payload;

            if (!state.completedDiagonals.includes(index)) {
                state.completedDiagonals.push(index);
            }
        },
        resetCompletedDiagonals: state => {
            state.completedDiagonals = [];
        },
    },
});

export const {
    setGrid,
    setSolution,
    setSelectedValue,
    resetSelectedValue,
    setSelectedCell,
    resetSelectedCell,
    setHintCell,
    resetHintCell,
    restartGame,
    clearGridErrors,
    updateCellValue,
    updateCellNotes,
    addCompletedBox,
    resetCompletedBoxes,
    addCompletedRow,
    resetCompletedRows,
    addCompletedColumn,
    resetCompletedColumns,
    addCompletedDiagonal,
    resetCompletedDiagonals,
} = gameGridSlice.actions;

export default gameGridSlice.reducer;
