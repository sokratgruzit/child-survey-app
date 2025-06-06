import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface StepState {
  value: number;
  loading: boolean;
}

const initialState: StepState = {
  value: 0,
  loading: false
};

const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    nextStep: (state) => {
      state.value += 1;
    },
    prevStep: (state) => {
      state.value = Math.max(0, state.value - 1);
    },
  },
});

export const { setLoading, nextStep, prevStep } = stepSlice.actions;
export default stepSlice.reducer;
