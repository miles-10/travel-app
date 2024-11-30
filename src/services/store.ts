// store/index.ts
import {configureStore} from '@reduxjs/toolkit';
import historyReducer from './history/history';
import weatherReducer from './weather/weather';

export const store = configureStore({
  reducer: {
    history: historyReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
