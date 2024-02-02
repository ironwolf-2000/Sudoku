import { SudokuType } from '@/app/const';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface GameSettingsState {
    level: number;
    initialCheckCount: number;
    initialHintCount: number;
    sudokuType: SudokuType;
    boardSize: number;
}

const initialState: GameSettingsState = {
    level: 1,
    initialCheckCount: 1,
    initialHintCount: 3,
    sudokuType: SudokuType.CLASSIC,
    boardSize: 9,
};

const MAX_CHECK_COUNT = 3;
const MAX_HINT_COUNT = 5;

export const gameSettingsSlice = createSlice({
    name: 'gameSettings',
    initialState,
    reducers: {
        setLevel: (state, action: PayloadAction<number>) => {
            state.level = action.payload;
        },
        incrementInitialCheckCount: state => {
            state.initialCheckCount = (state.initialCheckCount + 1) % (MAX_CHECK_COUNT + 1);
        },
        incrementInitialHintCount: state => {
            state.initialHintCount = (state.initialHintCount + 1) % (MAX_HINT_COUNT + 1);
        },
        setSudokuType: (state, action: PayloadAction<SudokuType>) => {
            state.sudokuType = action.payload;
        },
        setBoardSize: (state, action: PayloadAction<number>) => {
            state.boardSize = action.payload;
        },
    },
});

export const { setLevel, incrementInitialCheckCount, incrementInitialHintCount, setSudokuType, setBoardSize } =
    gameSettingsSlice.actions;

export default gameSettingsSlice.reducer;
