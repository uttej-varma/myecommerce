import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder:null
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (amount) => {
    const response = await createOrder(amount);
    return response.data;
  }
);

export const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload) ;
        state.currentOrder=action.payload
      });
  },
});




export const selectCurrentOrder=(state)=>state.order.currentOrder;
export default orderReducer.reducer;
