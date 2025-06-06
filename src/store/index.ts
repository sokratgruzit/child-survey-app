import { configureStore } from '@reduxjs/toolkit';
import uploadReducer from './uploadSlice.ts';
import stepReducer from './stepSlice.ts';

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    step: stepReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
