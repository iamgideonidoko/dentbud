import store, { rootReducer } from '../store/store';

export type Token = {
  accessToken: string;
  refreshToken: string;
};

// Infer the `RootState` type from the store
export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type from the store
export type AppDispatch = typeof store.dispatch;

// Infer the `RootReducer` type from the rootReducer defined above
export type RootReducer = typeof rootReducer;

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

// auth slice
export interface AuthState {
  userInfo: User | null;
  token: Token | null;
  isAuthenticated: boolean;
}

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  retype_password: string;
}

export type RegisterUserResponse = Token & {
  user: User;
};

export interface LoginUserInput {
  email: string;
  password: string;
}

export type LoginUserResponse = RegisterUserResponse;

export interface LogoutUserInput {
  user_id: string;
}

export interface LogoutUserResponse {
  message: string;
}

// CHAT SLICE

export interface SingleChat {
  sender: 'dentbud' | 'user';
  message: string;
  time: string;
}
export interface ChatState {
  chat: Array<SingleChat>;
}

export interface ConverseRasaInput {
  id: string;
  name: string;
  email: string;
  text: string;
}

export interface ConverseRasaResponse {
  text: string;
}

// TASK
export type Task = {
  title: string;
  description: string;
  starts: Date | string;
  ends: Date | string;
  done: boolean;
};

export type TaskResponse = Task & {
  user_id: string;
  _id: string;
  created_at: Date | string;
};

// ADD TASK
export type AddTaskInput = Task & { user_id: string };
export type AddTaskResponse = TaskResponse;

// GET TASK
export type GetTasksResponse = Array<TaskResponse>;

export type GetTaskResponse = TaskResponse;

// UPDATE TASK
export type UpdateTaskResponse = TaskResponse;
export type UpdateTaskInput = Partial<Task> & { user_id: string; id: string };

// DELETE TASK
export type DeleteTaskResponse = { deleted: boolean };

// --

// COURSE
export type Course = {
  course_name: string;
  course_code: string;
  exam_starts: Date | string;
  exam_ends: Date | string;
};

export type CourseResponse = Course & {
  user_id: string;
  _id: string;
  created_at: Date | string;
};

// ADD COURSE
export type AddCourseInput = Course & { user_id: string };
export type AddCourseResponse = CourseResponse;

// GET COURSE
export type GetCoursesResponse = Array<CourseResponse>;

export type GetCourseResponse = CourseResponse;

// UPDATE COURSE
export type UpdateCourseResponse = CourseResponse;
export type UpdateCourseInput = Partial<Course> & { user_id: string; id: string; new_course_code: boolean };

// DELETE COURSE
export type DeleteCourseResponse = { deleted: boolean };
