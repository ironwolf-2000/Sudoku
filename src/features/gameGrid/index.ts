import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Grid, Coordinate } from '@/app/types';

interface GameGridState {
    grid: Grid;
    solution: Grid;
    selectedValue?: number;
    selectedCell?: Coordinate;
    hintCell?: Coordinate;
}

const initialState: GameGridState = {
    grid: [],
    solution: [],
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
} = gameGridSlice.actions;

export default gameGridSlice.reducer;
