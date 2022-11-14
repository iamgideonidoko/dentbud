import coreApi from './core.api';
import type { AddCourseInput, AddCourseResponse } from '../../interfaces/store.interface';

const courseApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    addCourse: builder.mutation<AddCourseResponse, AddCourseInput>({
      query: (body) => ({
        url: `course`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: { course: AddCourseResponse } }) => response.data.course,
    }),
  }),
});

export const { useAddCourseMutation } = courseApi;

export default courseApi;
