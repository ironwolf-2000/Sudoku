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
    completedBoxesStr: string;
    completedRowsStr: string;
    completedColumnsStr: string;
    completedDiagonalsStr: string;
}

const initialState: GameGridState = {
    grid: [],
    solution: [],
    completedBoxesStr: '',
    completedRowsStr: '',
    completedColumnsStr: '',
    completedDiagonalsStr: '',
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
            state.completedBoxesStr = '';
            state.completedRowsStr = '';
            state.completedColumnsStr = '';
            state.completedDiagonalsStr = '';
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
            const index = String(action.payload);

            if (!state.completedBoxesStr.includes(index)) {
                state.completedBoxesStr += index;
            }
        },
        resetCompletedBoxes: state => {
            state.completedBoxesStr = '';
        },
        addCompletedRow: (state, action: PayloadAction<number>) => {
            const index = String(action.payload);

            if (!state.completedRowsStr.includes(index)) {
                state.completedRowsStr += index;
            }
        },
        resetCompletedRows: state => {
            state.completedRowsStr = '';
        },
        addCompletedColumn: (state, action: PayloadAction<number>) => {
            const index = String(action.payload);

            if (!state.completedColumnsStr.includes(index)) {
                state.completedColumnsStr += index;
            }
        },
        resetCompletedColumns: state => {
            state.completedColumnsStr = '';
        },
        addCompletedDiagonal: (state, action: PayloadAction<number>) => {
            const index = String(action.payload);

            if (!state.completedDiagonalsStr.includes(index)) {
                state.completedDiagonalsStr += index;
            }
        },
        resetCompletedDiagonals: state => {
            state.completedDiagonalsStr = '';
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
