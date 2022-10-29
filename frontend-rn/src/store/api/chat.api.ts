import coreApi from './core.api';
import type { ConverseRasaResponse, ConverseRasaInput } from '../../interfaces/store.interface';

const chatApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    converseRasa: builder.mutation<ConverseRasaResponse, ConverseRasaInput>({
      query: (body) => ({
        url: `proxy/rasa/converse`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: ConverseRasaResponse }) => response.data,
    }),
  }),
});

export const { useConverseRasaMutation } = chatApi;

export default chatApi;
