import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder,fetchAllOrders,updateOrderById } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder:null,
  totalOrdersCount:0
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (amount) => {
    const response = await createOrder(amount);
    return response.data;
  }
);

export const updateOrderByIdAsync = createAsyncThunk(
  'order/updateOrderById',
  async (order) => {
    const response = await updateOrderById(order);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort,pagination}) => {
    const response = await fetchAllOrders({sort,pagination});
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
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders=action.payload.orders
        state.totalOrdersCount=action.payload.totalOrders
      })
      .addCase(updateOrderByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.orders.findIndex(item=>item.id===action.payload.id)
        state.orders[index]=action.payload
      });
  },
});




export const selectCurrentOrder=(state)=>state.order.currentOrder;
export const selectTotalOrdersCount=(state)=>state.order.totalOrdersCount;
export const selectTotalOrders=(state)=>state.order.orders;
export default orderReducer.reducer;
