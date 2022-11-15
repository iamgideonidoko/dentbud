import coreApi from './core.api';
import type {
  AddTaskInput,
  AddTaskResponse,
  GetTasksResponse,
  UpdateTaskInput,
  UpdateTaskResponse,
  DeleteTaskResponse,
} from '../../interfaces/store.interface';

const taskApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, { user_id: string }>({
      query: ({ user_id }) => `tasks/user/${user_id}`,
      transformResponse: (response: { data: { tasks: GetTasksResponse } }) => response.data.tasks,
      providesTags: ['Tasks'],
    }),
    addTask: builder.mutation<AddTaskResponse, AddTaskInput>({
      query: (body) => ({
        url: `task`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: { task: AddTaskResponse } }) => response.data.task,
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation<UpdateTaskResponse, UpdateTaskInput>({
      query: ({ id, ...body }) => ({
        url: `task/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: { data: { task: UpdateTaskResponse } }) => response.data.task,
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: builder.mutation<DeleteTaskResponse, { id: string }>({
      query: ({ id }) => ({
        url: `task/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: DeleteTaskResponse }) => response.data,
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const { useAddTaskMutation, useGetTasksQuery, useUpdateTaskMutation, useDeleteTaskMutation } = taskApi;

export default taskApi;
