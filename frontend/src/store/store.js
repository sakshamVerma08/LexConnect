import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import caseReducer from './slices/caseSlice';
import lawyerReducer from './slices/lawyerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cases: caseReducer,
    lawyers: lawyerReducer,
  },
});
