import { configureStore } from '@reduxjs/toolkit';
import modelReducer from '../features/model/modelSlice';

export const store = configureStore({
  reducer: {
    models: modelReducer,
  },
});