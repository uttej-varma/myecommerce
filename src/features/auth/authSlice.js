import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,checkUser } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error:null,
};

export const userRegistrationAsync = createAsyncThunk(
  'users/register',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  'users/login',
  async (userData) => {
    const response = await checkUser(userData);
    return response.data;
  }
);

export const authReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegistrationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userRegistrationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
        console.log(initialState,state.loggedInUser)
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
        console.log(state,state.error);
      });
  },
});



export const selectCount = (state) => state.counter.value;
export const selectLoggedInUser=(state)=>state.auth.loggedInUser;
export const selectError=(state)=>state.auth.error;
export default authReducer.reducer;
