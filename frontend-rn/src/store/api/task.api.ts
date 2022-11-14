import coreApi from './core.api';
import type { AddTaskInput, AddTaskResponse } from '../../interfaces/store.interface';

const taskApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation<AddTaskResponse, AddTaskInput>({
      query: (body) => ({
        url: `task`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: { task: AddTaskResponse } }) => response.data.task,
    }),
  }),
});

export const { useAddTaskMutation } = taskApi;

export default taskApi;
