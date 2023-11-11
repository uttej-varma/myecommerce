import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,loginUser,signOut,checkAuth } from './authAPI';
import { updateUser } from '../user/userAPI';

const initialState = {
  loggedInUserToken: null,   ///will contain id,role only
  status: 'idle',
  error:null,
  userChecked:false,
};

export const userRegistrationAsync = createAsyncThunk(
  'users/register',
  async (userData,{rejectWithValue}) => {
    try{
      const response = await createUser(userData);
    return response.data;
    }
    catch(error){
      return rejectWithValue(error)
    }
  }
);
export const loginUserAsync = createAsyncThunk(
  'users/login',
  async (userData,{rejectWithValue}) => {
    try{
      const response = await loginUser(userData);
    return response.data;
    }
    catch(error){
      console.log(error,'aerugfyrgfrwegueu')
      return rejectWithValue(error)
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  'users/checkAuth',
  async () => {
    try{
      const response = await checkAuth();
    return response.data;
    }
    catch(error){
      console.log(error)
    }
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
        state.loggedInUserToken = action.payload;
        state.error=null;
      })
      .addCase(userRegistrationAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken=null;
        state.error = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
    
      .addCase(userSignOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userSignOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = true
      });
  },
});



export const selectLoggedInUser=(state)=>state.auth.loggedInUserToken;
export const selectError=(state)=>state.auth.error;
export const selectUserChecked=(state)=>state.auth.userChecked
export default authReducer.reducer;

