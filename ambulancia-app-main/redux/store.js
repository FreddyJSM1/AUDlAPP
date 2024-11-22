import { configureStore } from '@reduxjs/toolkit';
import ambulanciaReducer from './ambulanciaSlice';

export const store = configureStore({
  reducer: {
    ambulancia: ambulanciaReducer,
  },
});
