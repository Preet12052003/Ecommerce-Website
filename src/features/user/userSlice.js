import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders, updateUser, fetchLoggedInUser } from './userApi';

const initialState = {
  status: 'idle',
  userInfo: null
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrderAsyncThunk',
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
  }
);

export const fetchLoggedInUsersAsync = createAsyncThunk(
  'user/fetchLoggedInUserAsyncThunk',
  async (userId) => {
    const response = await fetchLoggedInUser(userId);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUserAsyncThunk',
  async (userId) => {
    const response = await updateUser(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
        // console.log(userInfo);
      })
      .addCase(fetchLoggedInUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
        // console.log(userInfo);
      });
  },
});

// export const {  } = userSlice.actions;
export const selectUserOrders = (state) => {
  return state.user.userInfo.orders
}
export const selectUserInfo = (state) => state.user.userInfo
export default userSlice.reducer;