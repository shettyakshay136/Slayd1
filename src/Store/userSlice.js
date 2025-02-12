import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    age: null,
    gender: '',
    number: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    setName: (state, action) => { state.name = action.payload; },
    setAge: (state, action) => { state.age = action.payload; },
    setGender: (state, action) => { state.gender = action.payload; },
    setNumber: (state, action) => { state.number = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUserData.pending, (state) => { state.status = 'loading'; })
      .addCase(postUserData.fulfilled, (state) => { state.status = 'succeeded'; })
      .addCase(postUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setName, setAge, setGender, setNumber } = userSlice.actions;
export default userSlice.reducer;
