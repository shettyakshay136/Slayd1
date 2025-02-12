// redux/slices/similarProductsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const similarProductsSlice = createSlice({
  name: 'similarProducts',
  initialState: {
    data: [],
    loading: false,
    hasMore: true,
    page: 1,
  },
  reducers: {
    setSimilarProducts: (state, action) => {
      state.data = action.payload;
    },
    addSimilarProducts: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetSimilarProducts: (state) => {
      state.data = [];
      state.loading = false;
      state.hasMore = true;
      state.page = 1;
    },
  },
});

export const {
  setSimilarProducts,
  addSimilarProducts,
  setLoading,
  setHasMore,
  setPage,
  resetSimilarProducts,
} = similarProductsSlice.actions;

export default similarProductsSlice.reducer;
