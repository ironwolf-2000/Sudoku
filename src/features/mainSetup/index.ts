import { INITIAL_CLUE_COUNT, SudokuType } from '@/app/const';
import { ClueCount } from '@/app/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const MAX_CHECK_COUNT = 3;
const MAX_HINT_COUNT = 5;

interface mainSetupState {
    initialCheckCount: number;
    initialHintCount: number;
    initialWithNotes: boolean;
    initialClueCount: ClueCount;
    sudokuType: SudokuType;
    gridSize: number;
}

const initialState: mainSetupState = {
    initialCheckCount: 1,
    initialHintCount: 3,
    initialWithNotes: true,
    initialClueCount: INITIAL_CLUE_COUNT,
    sudokuType: SudokuType.CLASSIC,
    gridSize: 9,
};

export const mainSetupSlice = createSlice({
    name: 'mainSetup',
    initialState,
    reducers: {
        incrementInitialCheckCount: state => {
            state.initialCheckCount = (state.initialCheckCount + 1) % (MAX_CHECK_COUNT + 1);
        },
        incrementInitialHintCount: state => {
            state.initialHintCount = (state.initialHintCount + 1) % (MAX_HINT_COUNT + 1);
        },
        toggleInitialWithNotes: state => {
            state.initialWithNotes = !state.initialWithNotes;
        },
        setInitialClueCount: (
            state,
            action: PayloadAction<{ sudokuType: SudokuType; gridSize: number; value: number }>
        ) => {
            const { sudokuType, gridSize, value } = action.payload;
            state.initialClueCount[sudokuType][gridSize] = value;
        },
        setSudokuType: (state, action: PayloadAction<SudokuType>) => {
            state.sudokuType = action.payload;
        },
        setGridSize: (state, action: PayloadAction<number>) => {
            state.gridSize = action.payload;
        },
    },
});

export const {
    incrementInitialCheckCount,
    incrementInitialHintCount,
    toggleInitialWithNotes,
    setInitialClueCount,
    setSudokuType,
    setGridSize,
} = mainSetupSlice.actions;

export default mainSetupSlice.reducer;
