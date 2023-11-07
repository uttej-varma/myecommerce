import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { createUser,checkUser,signOut } from './authAPI';
import { updateUser } from '../user/userAPI';

const initialState = {
  loggedInUser: null,   ///will contain id,role only
  status: 'idle',
  error:null,
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
export const checkUserAsync = createAsyncThunk(
  'users/login',
  async (userData,{rejectWithValue}) => {
    try{
      const response = await checkUser(userData);
    return response.data;
    }
    catch(error){
      console.log(error,'aerugfyrgfrwegueu')
      return rejectWithValue(error)
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
        state.loggedInUser = action.payload;
        state.error=null;
      })
      .addCase(userRegistrationAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.loggedInUser=null;
        state.error = action.payload;
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
        state.error = action.payload;
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

