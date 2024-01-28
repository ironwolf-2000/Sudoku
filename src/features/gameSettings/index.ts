import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface GameSettingsState {
    boardSize: number;
    level: number;
}

const initialState: GameSettingsState = {
    level: 1,
    boardSize: 9,
};

export const gameSettingsSlice = createSlice({
    name: 'gameSettings',
    initialState,
    reducers: {
        setLevel: (state, action: PayloadAction<number>) => {
            state.level = action.payload;
        },
        setBoardSize: (state, action: PayloadAction<number>) => {
            state.boardSize = action.payload;
        },
    },
});

export const { setBoardSize, setLevel } = gameSettingsSlice.actions;

export default gameSettingsSlice.reducer;
