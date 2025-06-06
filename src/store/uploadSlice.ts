import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UploadState {
  taskId: string | null;
  allUploaded: boolean; 
  status: string;
  reportStatus: string;
}

const initialState: UploadState = {
  taskId: null,
  allUploaded: false, 
  status: "",
  reportStatus: ""
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setTaskId(state, action: PayloadAction<string>) {
      state.taskId = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setReportStatus(state, action: PayloadAction<string>) {
      state.reportStatus = action.payload;
    },
    setAllUploaded(state, action: PayloadAction<boolean>) {
      state.allUploaded = action.payload;
    },
  },
});

export const { setTaskId, setAllUploaded, setStatus, setReportStatus } = uploadSlice.actions;
export default uploadSlice.reducer;
