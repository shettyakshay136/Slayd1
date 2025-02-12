import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    liked: [],
    wishlist: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToLiked: (state, action) => {
      state.liked.unshift(action.payload);
    },
    addToWishlist: (state, action) => {
      state.wishlist.unshift(action.payload);
    },
    setLikedItems: (state, action) => {
      state.liked = action.payload;
    },
    setWishlistItems: (state, action) => {
      state.wishlist = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addToLiked, addToWishlist, setLikedItems, setWishlistItems, setLoading, setError } = favoritesSlice.actions;

export const fetchLikedItems = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;  
  if (!userId) return; 

  dispatch(setLoading(true));
  try {
    const response = await axios.get(`http://43.205.235.112/activity/activity?user_id=${userId}&action=like`);
    dispatch(setLikedItems(response.data));
    console.log("Liked Items:", response.data);
  } catch (error) {
    console.error("Error fetching liked items:", error);
    dispatch(setError('Failed to fetch liked items.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchWishlistItems = () => async (dispatch, getState) => {
  const userId = getState().auth.userId; 
  if (!userId) return;  

  dispatch(setLoading(true));
  try {
    const response = await axios.get(`http://43.205.235.112/activity/activity?user_id=${userId}&action=wishlist`);
    dispatch(setWishlistItems(response.data));
    console.log("Wishlist Items:", response.data);
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    dispatch(setError('Failed to fetch wishlist items.'));
  } finally {
    dispatch(setLoading(false));
  }
};


export default favoritesSlice.reducer;
