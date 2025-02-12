// mediaSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentMediaId: null, 
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setCurrentMediaId: (state, action) => {
      state.currentMediaId = action.payload;
    },
  },
});

export const { setCurrentMediaId } = mediaSlice.actions;

export default mediaSlice.reducer;
