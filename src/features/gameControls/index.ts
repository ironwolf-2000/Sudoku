import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface GameControlsState {
    checksCount: number;
    hintsCount: number;
}

const initialState: GameControlsState = {
    checksCount: 1,
    hintsCount: 3,
};

export const gameControlsSlice = createSlice({
    name: 'gameControls',
    initialState,
    reducers: {
        setCheckCount: (state, action: PayloadAction<number>) => {
            state.checksCount = action.payload;
        },
        decrementChecksCount: state => {
            state.checksCount--;
        },
        setHintsCount: (state, action: PayloadAction<number>) => {
            state.hintsCount = action.payload;
        },
        decrementHintsCount: state => {
            state.hintsCount--;
        },
    },
});

export const { setCheckCount, decrementChecksCount, setHintsCount, decrementHintsCount } = gameControlsSlice.actions;

export default gameControlsSlice.reducer;
