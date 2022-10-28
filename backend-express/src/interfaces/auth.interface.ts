export interface LoginUser {
  email: string;
  password: string;
}

export interface RefreshToken {
  refreshToken: string;
}

export interface LogoutUser {
  user_id: string;
}
