import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../../interfaces/store.interface';
import userApi from '../api/user.api';
import authApi from '../api/auth.api';

const initialState: AuthState = {
  userInfo: null,
  token: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.registerUser.matchFulfilled, (state, { payload }) => {
        const { accessToken, refreshToken, user } = payload;
        state.token = { accessToken, refreshToken };
        state.userInfo = user;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
        const { accessToken, refreshToken, user } = payload;
        state.token = { accessToken, refreshToken };
        state.userInfo = user;
        state.isAuthenticated = true;
      });
  },
});

// export actions
// export const { loginUser, logoutUser, registerUser } = authSlice.actions;

export default authSlice.reducer;
