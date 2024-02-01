import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface GameControlsState {
    checkCount: number;
    hintCount: number;
    gamePaused: boolean;
}

const initialState: GameControlsState = {
    checkCount: 0,
    hintCount: 0,
    gamePaused: false,
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
        toggleGamePaused: state => {
            state.gamePaused = !state.gamePaused;
        },
    },
});

export const { setCheckCount, decrementCheckCount, setHintCount, decrementHintCount, toggleGamePaused } =
    gameControlsSlice.actions;

export default gameControlsSlice.reducer;
