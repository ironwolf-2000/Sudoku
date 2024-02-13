import { configureStore } from '@reduxjs/toolkit';

import appSettingsReducer from '@/features/appSettings';
import gameControlsReducer from '@/features/gameControls';
import gameGridReducer from '@/features/gameGrid';
import gameSettingsReducer from '@/features/gameSettings';

export const store = configureStore({
    reducer: {
        appSettings: appSettingsReducer,
        gameControls: gameControlsReducer,
        gameGrid: gameGridReducer,
        gameSettings: gameSettingsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
