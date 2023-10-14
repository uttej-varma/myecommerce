import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addTocart,fetchItemsByUserId,updateCart,deleteItemFromCart } from './cartAPI';

const initialState = {
  item: [],
  status: 'idle',
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addTocart(item);
    return response.data;
  }
);
export const fetctItemsByUserIdAsync = createAsyncThunk(
  'cart/getCart',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    return response.data;
  }
);
export const updateItemsAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);
export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItem',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
);

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.item.push(action.payload);
      })
      .addCase(fetctItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetctItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.item=action.payload;
      })
      .addCase(updateItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.item.findIndex(items=>items.id===action.payload.id)
        state.item[index]=action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.item.findIndex(items=>items.id===action.payload.id)
        state.item.splice(index,1);
      });
  },
});



export const selectItems = (state) => state.cart.item;

export default cartReducer.reducer;
