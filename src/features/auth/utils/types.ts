export interface LoginFields {
  username: string;
  password: string;
}

export interface LoginErrors {
  username?: string;
  password?: string;
  general?: string;
}