import { configureStore } from '@reduxjs/toolkit';

import gameControlsReducer from '@/features/gameControls';
import gameSettingsReducer from '@/features/gameSettings';

export const store = configureStore({
    reducer: { gameControls: gameControlsReducer, gameSettings: gameSettingsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
