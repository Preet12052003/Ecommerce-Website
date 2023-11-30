import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser  , checkUser, signOut } from './authAPI';

const initialState = {
  loggedInUser: null, // This only contains basic info about user like (email, username, id, password)
  status: 'idle',
  error: null
};

export const createUserAsync = createAsyncThunk(
  'auth/createUserAsyncThunk',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
)

export const signOutAsync = createAsyncThunk(
  'auth/signOutAsyncThunk',
  async (id) => {
    const response = await signOut(id);
    return response.data;
  }
)

export const checkUserAsync = createAsyncThunk(
  'auth/checkUserAsyncThunk',
  async (LogginInfo, {rejectWithValue}) => {
    try {
      const response = await checkUser(LogginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error)
    }
  }
)

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state, action) => {
        state.status = 'idle';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null
      })
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser
export const selectError = (state) => state.auth.error

export const {incrementByAmount} = userSlice.actions;

export default userSlice.reducer;
