export interface NewUser {
  name: string;
  email: string;
  password: string;
  retype_password: string;
}

export interface RegisterReturn {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  user: {
    id: string;
    name: string;
    email: string;
    created_at: Date;
  };
}
