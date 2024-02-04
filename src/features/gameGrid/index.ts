import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Board, Coordinate } from '@/app/types';

interface GameGridState {
    board: Board;
    solution: Board;
    selectedValue?: number;
    selectedCell?: Coordinate;
    hintCell?: Coordinate;
    checkMode: boolean;
}

const initialState: GameGridState = {
    board: [],
    solution: [],
    checkMode: false,
};

export const gameGridSlice = createSlice({
    name: 'gameGrid',
    initialState,
    reducers: {
        setBoard: (state, action: PayloadAction<Board>) => {
            state.board = action.payload;
        },
        setSolution: (state, action: PayloadAction<Board>) => {
            state.solution = action.payload;
        },
        setSelectedValue: (state, action: PayloadAction<number | undefined>) => {
            state.selectedValue = action.payload;
        },
        setSelectedCell: (state, action: PayloadAction<Coordinate | undefined>) => {
            state.selectedCell = action.payload;
        },
        setHintCell: (state, action: PayloadAction<Coordinate | undefined>) => {
            state.hintCell = action.payload;
        },
        setCheckMode: (state, action: PayloadAction<boolean>) => {
            state.checkMode = action.payload;
        },
        restartGame: state => {
            for (let i = 0; i < state.board.length; i++) {
                for (let j = 0; j < state.board.length; j++) {
                    if (!state.board[i][j].clue) {
                        state.board[i][j].val = 0;
                    }
                }
            }

            state.selectedCell = undefined;
            state.checkMode = false;
        },
        updateSelectedCellValue: (state, action: PayloadAction<number>) => {
            if (!state.selectedCell) {
                return;
            }

            const val = action.payload;
            const [r, c] = state.selectedCell;

            state.board[r][c].val = val;
            state.board[r][c].notes = [];
        },
        updateSelectedCellNotes: (state, action: PayloadAction<number>) => {
            if (!state.selectedCell) {
                return;
            }

            const val = action.payload;
            const [r, c] = state.selectedCell;

            const itemIndex = state.board[r][c].notes.indexOf(val);

            if (itemIndex === -1) {
                state.board[r][c].notes.push(val);
            } else {
                state.board[r][c].notes.splice(itemIndex, 1);
            }
        },
    },
});

export const {
    setBoard,
    setSolution,
    setSelectedValue,
    setSelectedCell,
    setHintCell,
    setCheckMode,
    restartGame,
    updateSelectedCellValue,
    updateSelectedCellNotes,
} = gameGridSlice.actions;

export default gameGridSlice.reducer;
