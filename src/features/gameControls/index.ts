import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface GameControlsState {
    checkCount: number;
    hintCount: number;
    withNotes: boolean;
}

const initialState: GameControlsState = {
    checkCount: 0,
    hintCount: 0,
    withNotes: false,
};

export const gameControlsSlice = createSlice({
    name: 'gameControls',
    initialState,
    reducers: {
        setCheckCount: (state, action: PayloadAction<number>) => {
            state.checkCount = action.payload;
        },
        decrementCheckCount: state => {
            state.checkCount--;
        },
        setHintCount: (state, action: PayloadAction<number>) => {
            state.hintCount = action.payload;
        },
        decrementHintCount: state => {
            state.hintCount--;
        },
        toggleWithNotes: state => {
            state.withNotes = !state.withNotes;
        },
    },
});

export const { setCheckCount, decrementCheckCount, setHintCount, decrementHintCount, toggleWithNotes } =
    gameControlsSlice.actions;

export default gameControlsSlice.reducer;
