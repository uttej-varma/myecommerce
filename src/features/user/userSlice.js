import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders,updateUser,fetchLoggedInUser } from './userAPI';

const initialState = {
  status: 'idle',
  userInfo:null,
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    return response.data;
  }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (id) => {
    const response = await fetchLoggedInUser(id);
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUserAsync',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        ///this info can beyond the info of logged in user like address and orders etc.,
        state.userInfo.orders = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        ///this info can beyond the info of logged in user like address and orders etc.,
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      });
  },
});


//TODO : change orders and address to be independent of users
export const userOrders=(state)=>state.user.userInfo.orders;
export const selectUserInfo=(state)=>state.user.userInfo;
export default userReducer.reducer;
