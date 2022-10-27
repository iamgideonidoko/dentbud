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

export interface LogignUserInput {
  email: string;
  password: string;
}
