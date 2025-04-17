import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cases: [],
  currentCase: null,
  loading: true,
  error: null
};

export const caseSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    getCases: (state, action) => {
      state.cases = action.payload;
      state.loading = false;
    },
    getCase: (state, action) => {
      state.currentCase = action.payload;
      state.loading = false;
    },
    createCase: (state, action) => {
      state.cases.unshift(action.payload);
    },
    updateCase: (state, action) => {
      state.cases = state.cases.map(case_ =>
        case_.id === action.payload.id ? action.payload : case_
      );
      if (state.currentCase?.id === action.payload.id) {
        state.currentCase = action.payload;
      }
    },
    setCaseError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearCaseError: (state) => {
      state.error = null;
    }
  }
});

export const {
  getCases,
  getCase,
  createCase,
  updateCase,
  setCaseError,
  clearCaseError
} = caseSlice.actions;

export default caseSlice.reducer;
