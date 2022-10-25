import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../../interfaces/store.interface';

const initialState: AuthState = {
  userInfo: null,
  token: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {},
});

// export actions
// export const { loginUser, logoutUser, registerUser } = authSlice.actions;

export default authSlice.reducer;
