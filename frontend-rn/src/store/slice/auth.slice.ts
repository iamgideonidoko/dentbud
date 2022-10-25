import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../../interfaces/store.interface';
import userApi from '../api/user.api';

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
    builder.addMatcher(userApi.endpoints.registerUser.matchFulfilled, (state, { payload }) => {
      console.log('register user response payload => ', payload);
    });
  },
});

// export actions
// export const { loginUser, logoutUser, registerUser } = authSlice.actions;

export default authSlice.reducer;
