import { configureStore } from '@reduxjs/toolkit';
import storeAuthReducer from './storeAuthSlice';
import brandAuthReducer from './brandAuthSlice';

const store = configureStore({
  reducer: {
    storeAuth: storeAuthReducer,
    brandAuth: brandAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
