import coreApi from './core.api';
import type {
  LoginUserResponse,
  LoginUserInput,
  LogoutUserInput,
  LogoutUserResponse,
} from '../../interfaces/store.interface';

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
    logoutUser: builder.mutation<LogoutUserResponse, LogoutUserInput>({
      query: (body) => ({
        url: `auth/logout`,
        method: 'POST',
        body,
      }),
      transformResponse: ({ message }: { message: string }) => ({ message }),
    }),
  }),
});

export const { useLoginUserMutation, useLogoutUserMutation } = authApi;

export default authApi;
