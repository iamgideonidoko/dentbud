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

export const getGreetTimeOfDay = () => {
  const splitAfternoon = 12, // 24hr time to split the afternoon
    splitEvening = 16, // 24hr time to split the evening
    currentHour = parseFloat(new Date().getHours().toString());

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    // Between 12 PM and 5PM
    return 'afternoon';
  } else if (currentHour >= splitEvening) {
    // Between 5PM and Midnight
    return 'evening';
  }
  // Between dawn and noon
  return 'morning';
};
