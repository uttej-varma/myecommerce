import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,checkUser,signOut } from './authAPI';
import { updateUser } from '../user/userAPI';

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
export const updateUserAsync = createAsyncThunk(
  'users/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const userSignOutAsync = createAsyncThunk(
  'users/signOut',
  async () => {
    const response = await signOut();
    return response.data;
  }
);

export const authReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegistrationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userRegistrationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
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
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(userSignOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userSignOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      });
  },
});



export const selectLoggedInUser=(state)=>state.auth.loggedInUser;
export const selectError=(state)=>state.auth.error;
export default authReducer.reducer;

