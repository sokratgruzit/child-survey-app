import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SurveyData {
  name: string;
  age: string;
  gender: string;
  education: string;
  profession: string;
  workingWithChildren: string;
  howFound: string;
  motivation: string;
  experience: string;
  difficulties: string;
  ideas: string;
  thoughts: string;
}

interface SurveyState {
  data: SurveyData | null;
}

const initialState: SurveyState = {
  data: null,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setSurveyData(state, action: PayloadAction<SurveyData>) {
      state.data = action.payload;
    },
  },
});

export const { setSurveyData } = surveySlice.actions;
export default surveySlice.reducer;
