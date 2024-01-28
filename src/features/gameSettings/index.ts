import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GameSettingsState } from './types';

const initialState: GameSettingsState = {
    boardSize: 9,
    level: 1,
};

export const gameSettingsSlice = createSlice({
    name: 'gameSettings',
    initialState,
    reducers: {
        selectBoardSize: (state, action: PayloadAction<number>) => {
            state.boardSize = action.payload;
        },
        selectLevel: (state, action: PayloadAction<number>) => {
            state.level = action.payload;
        },
    },
});

export const { selectBoardSize, selectLevel } = gameSettingsSlice.actions;

export default gameSettingsSlice.reducer;
