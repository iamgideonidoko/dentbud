import coreApi from './core.api';
import type { RegisterUserInput, RegisterUserResponse } from '../../interfaces/store.interface';

const userApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterUserResponse, RegisterUserInput>({
      query: (body) => ({
        url: `user/register`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: { user: RegisterUserResponse } }) => response.data.user,
    }),
  }),
});

export const { useRegisterUserMutation } = userApi;

export default userApi;
