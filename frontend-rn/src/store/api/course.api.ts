import coreApi from './core.api';
import type {
  AddCourseInput,
  AddCourseResponse,
  GetCoursesResponse,
  UpdateCourseInput,
  UpdateCourseResponse,
  DeleteCourseResponse,
} from '../../interfaces/store.interface';

const courseApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<GetCoursesResponse, { user_id: string }>({
      query: ({ user_id }) => `courses/user/${user_id}`,
      transformResponse: (response: { data: { courses: GetCoursesResponse } }) => response.data.courses,
      providesTags: ['Courses'],
    }),
    addCourse: builder.mutation<AddCourseResponse, AddCourseInput>({
      query: (body) => ({
        url: `course`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: { course: AddCourseResponse } }) => response.data.course,
      invalidatesTags: ['Courses'],
    }),
    updateCourse: builder.mutation<UpdateCourseResponse, UpdateCourseInput>({
      query: ({ id, ...body }) => ({
        url: `course/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: { data: { course: AddCourseResponse } }) => response.data.course,
      invalidatesTags: ['Courses'],
    }),
    deleteCourse: builder.mutation<DeleteCourseResponse, { id: string }>({
      query: ({ id }) => ({
        url: `course/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: DeleteCourseResponse }) => response.data,
      invalidatesTags: ['Courses'],
    }),
  }),
});

export const { useAddCourseMutation, useGetCoursesQuery } = courseApi;

export default courseApi;
