import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PopUp {
  title: string;
  description: string;
  show: boolean;
}

interface StepState {
  value: number;
  loading: boolean;
  showPopup: PopUp;
}

const initialState: StepState = {
  value: 0,
  loading: false,
  showPopup: {
    show: false,
    title: "",
    description: ""
  }
};

const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    showPopup: (state, action: PayloadAction<PopUp>) => {
      state.showPopup = action.payload;
    },
    nextStep: (state) => {
      state.value += 1;
    },
    prevStep: (state) => {
      state.value = Math.max(0, state.value - 1);
    },
  },
});

export const { setLoading, nextStep, prevStep, showPopup } = stepSlice.actions;
export default stepSlice.reducer;
