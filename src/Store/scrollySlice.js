import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isScrolledBelow30: null,
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setScrolledBelow30: (state, action) => {
      state.isScrolledBelow30 = action.payload;
    },
  },
});

export const { setScrolledBelow30 } = scrollSlice.actions;

export default scrollSlice.reducer;
