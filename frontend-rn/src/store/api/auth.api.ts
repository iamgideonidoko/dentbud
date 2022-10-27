import coreApi from './core.api';
import type { LoginUserResponse, LoginUserInput } from '../../interfaces/store.interface';

const authApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginUserResponse, LoginUserInput>({
      query: (body) => ({
        url: `auth/login`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: { user: LoginUserResponse } }) => response.data.user,
    }),
  }),
});

export const { useLoginUserMutation } = authApi;

export default authApi;
