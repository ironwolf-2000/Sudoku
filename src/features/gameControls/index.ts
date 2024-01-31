import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface GameControlsState {
    checkCount: number;
    hintCount: number;
}

const initialState: GameControlsState = {
    checkCount: 0,
    hintCount: 0,
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
    },
});

export const { setCheckCount, decrementCheckCount, setHintCount, decrementHintCount } = gameControlsSlice.actions;

export default gameControlsSlice.reducer;
