import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StoreAuthState {
  Store_id: string | null;
}

const initialState: StoreAuthState = {
  // Retrieve Store_id from localStorage if available
  Store_id: localStorage.getItem('Store_id') ? localStorage.getItem('Store_id') : null,
};

const storeAuthSlice = createSlice({
  name: 'storeAuth',
  initialState,
  reducers: {
    setStoreAuth(state, action: PayloadAction<StoreAuthState>) {
      state.Store_id = action.payload.Store_id;
      // Persist to localStorage when Store_id is set
      if (state.Store_id) {
        localStorage.setItem('Store_id', state.Store_id);
      }
    },
    clearStoreAuth(state) {
      state.Store_id = null;
      // Remove Store_id from localStorage when cleared
      localStorage.removeItem('Store_id');
    },
  },
});

export const { setStoreAuth, clearStoreAuth } = storeAuthSlice.actions;
export default storeAuthSlice.reducer;
