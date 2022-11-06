import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { CORE_BE_HOST } from '@env';
import type { RootState } from '../../interfaces/store.interface';
import { REHYDRATE } from 'redux-persist';

const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: `${CORE_BE_HOST}/api/`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token?.accessToken) {
        headers.set('Authorization', `Bearer ${token.accessToken}`);
      }
      return headers;
    },
  }),
  { maxRetries: 3 },
);

const coreApi = createApi({
  baseQuery: staggeredBaseQuery,
  /**
   *  Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints.
   * */
  tagTypes: [],
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action?.payload?.[reducerPath];
    }
  },
});

export default coreApi;
