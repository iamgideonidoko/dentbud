// import {AxiosRequestConfig} from 'axios';
// import {RootState} from './store/store';

// export const axiosHeaders = (getState: () => RootState) => {
//   const token = getState().auth.token;
//   // Headers
//   const axiosConfig: AxiosRequestConfig<object> = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   // If token, add to headers as bearer token
//   if (token && axiosConfig.headers) {
//     axiosConfig.headers.Authorization = `Bearer ${token}`;
//   }

//   return axiosConfig;
// };
