import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface gameHeaderState {
    gamePaused: boolean;
    gameScore: number;
    gameScoreChange: number;
}

const initialState: gameHeaderState = {
    gamePaused: false,
    gameScore: 0,
    gameScoreChange: 0,
};

export const gameHeaderSlice = createSlice({
    name: 'gameHeader',
    initialState,
    reducers: {
        toggleGamePaused: state => {
            state.gamePaused = !state.gamePaused;
        },
        updateGameScore: state => {
            state.gameScore += state.gameScoreChange;
        },
        resetGameScore: state => {
            state.gameScore = 0;
            state.gameScoreChange = 0;
        },
        setGameScoreChange: (state, action: PayloadAction<number>) => {
            state.gameScoreChange = action.payload;
        },
    },
});

export const { toggleGamePaused, updateGameScore, resetGameScore, setGameScoreChange } = gameHeaderSlice.actions;

export default gameHeaderSlice.reducer;
