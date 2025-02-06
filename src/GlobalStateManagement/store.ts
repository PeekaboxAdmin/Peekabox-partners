import { configureStore } from '@reduxjs/toolkit';
import storeAuthReducer from './storeAuthSlice';

const store = configureStore({
  reducer: {
    storeAuth: storeAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
