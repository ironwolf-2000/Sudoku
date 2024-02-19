import { configureStore } from '@reduxjs/toolkit';

import appSettingsReducer from '@/features/appSettings';
import gameControlsReducer from '@/features/gameControls';
import gameGridReducer from '@/features/gameGrid';
import gameHeaderReducer from '@/features/gameHeader';
import mainSetupReducer from '@/features/mainSetup';

export const store = configureStore({
    reducer: {
        appSettings: appSettingsReducer,
        gameControls: gameControlsReducer,
        gameGrid: gameGridReducer,
        gameHeader: gameHeaderReducer,
        mainSetup: mainSetupReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
