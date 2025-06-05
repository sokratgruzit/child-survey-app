import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UploadState {
  taskId: string | null;
}

const initialState: UploadState = {
  taskId: null,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setTaskId(state, action: PayloadAction<string>) {
      state.taskId = action.payload;
    },
  },
});

export const { setTaskId } = uploadSlice.actions;
export default uploadSlice.reducer;
