export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  fullname: string;
  phoneNumber: string;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}