import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BrandAuthState {
  Brand_id: string | null;
}

const initialState: BrandAuthState = {
  Brand_id: null,
};

const brandAuthSlice = createSlice({
  name: 'brandAuth',
  initialState,
  reducers: {
    setBrandAuth: (state, action: PayloadAction<BrandAuthState>) => {
      state.Brand_id = action.payload.Brand_id;
    },
    clearBrandAuth: (state) => {
      state.Brand_id = null;
    },
  },
});

export const { setBrandAuth, clearBrandAuth } = brandAuthSlice.actions;
export default brandAuthSlice.reducer;