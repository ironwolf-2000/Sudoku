import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AppSettingsState {
    withOverlay: boolean;
}

const initialState: AppSettingsState = {
    withOverlay: false,
};

export const appSettingsSlice = createSlice({
    name: 'gameSettings',
    initialState,
    reducers: {
        setWithOverlay: (state, action: PayloadAction<boolean>) => {
            state.withOverlay = action.payload;
        },
    },
});

export const { setWithOverlay } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
