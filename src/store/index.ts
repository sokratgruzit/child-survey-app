import { configureStore } from '@reduxjs/toolkit';
import uploadReducer from './uploadSlice.ts';
import surveyReducer from './surveySlice.ts';

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    survey: surveyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
