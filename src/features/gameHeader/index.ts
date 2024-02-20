import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface GameHeaderState {
    gamePaused: boolean;
    gameScore: number;
}

const initialState: GameHeaderState = {
    gamePaused: false,
    gameScore: 0,
};

export const gameHeaderSlice = createSlice({
    name: 'gameHeader',
    initialState,
    reducers: {
        toggleGamePaused: state => {
            state.gamePaused = !state.gamePaused;
        },
        increaseGameScore: (state, action: PayloadAction<number>) => {
            state.gameScore += action.payload;
        },
        resetGameScore: state => {
            state.gameScore = 0;
        },
    },
});

export const { toggleGamePaused, increaseGameScore, resetGameScore } = gameHeaderSlice.actions;

export default gameHeaderSlice.reducer;
