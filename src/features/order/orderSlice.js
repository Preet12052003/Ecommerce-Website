import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderApi';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrderAsyncThunk',
  async (orderInfo) => {
    const response = await createOrder(orderInfo);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    resetOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload
      });
  }
});

export const { resetOrder } = orderSlice.actions;
export const selectOrders = (state) => state.order.orders
export const selectCurrentOrder = (state) => state.order.currentOrder
export default orderSlice.reducer;