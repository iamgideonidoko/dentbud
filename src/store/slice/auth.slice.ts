// import {createSlice} from '@reduxjs/toolkit';

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: null,
//     isAuthenticated: false,
//     isLoading: false,
//     user: null,
//     isAttemtingLogin: false,
//     isUserLoaded: false,
//   },
//   reducers: {
//     loadUser: (state, action) => {
//       // ADMIN_USER_LOADED
//       // Failed? AUTH_ERROR
//     },
//     login: (state, action) => {
//       //add to auth array
//       state.auth = [...state.auth, action.payload];
//     },
//     logout: (state, action) => {
//       // LOGOUT_SUCCESS
//       state.auth = [];
//     },
//     register: () => {},
//   },
//   extraReducers: {},
// });

// // export actions
// export const {login, logout, loadUser, register} = authSlice.actions;

// export default authSlice.reducer;
