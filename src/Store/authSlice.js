import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login:(state, action) => {
      state.userId = action.payload.userId; 
    },
    setAuthenticated: (state) => {
      state.isAuthenticated = true; 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
    },
  },
});

export const { login, setAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;
