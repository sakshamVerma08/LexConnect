import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lawyers: [],
  currentProfile: null,
  loading: true,
  error: null
};

export const lawyerSlice = createSlice({
  name: 'lawyers',
  initialState,
  reducers: {
    getLawyers: (state, action) => {
      state.lawyers = action.payload;
      state.loading = false;
    },
    getLawyerProfile: (state, action) => {
      state.currentProfile = action.payload;
      state.loading = false;
    },
    updateProfile: (state, action) => {
      state.lawyers = state.lawyers.map(lawyer =>
        lawyer.id === action.payload.id ? action.payload : lawyer
      );
      if (state.currentProfile?.id === action.payload.id) {
        state.currentProfile = action.payload;
      }
    },
    setLawyerError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearLawyerError: (state) => {
      state.error = null;
    }
  }
});

export const {
  getLawyers,
  getLawyerProfile,
  updateProfile,
  setLawyerError,
  clearLawyerError
} = lawyerSlice.actions;

export default lawyerSlice.reducer;
