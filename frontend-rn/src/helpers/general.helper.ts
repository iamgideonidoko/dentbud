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

/**
 * {greet_time} shows great time of day ('morning' | 'afternoon' | 'evening')
 * {user_name} shows the name of the currently logged in user
 */
export const starterMessages = [
  'Good {greet_time} {user_name}, your fav assistant here. Kindly interact with me using the text field below',
  'Welcome {user_name}, is there anything I can do for you today? Kindly respond with the text field below',
];
