import { authApi } from "./authApi";
import type { RegisterPayload, LoginPayload } from "../../types/auth";

export const authService = {
  register: async (data: RegisterPayload) => {
    const res = await authApi.post("/register", data);
    return res.data; // { accessToken, refreshToken }
  },

  login: async (data: LoginPayload) => {
    const res = await authApi.post("/login", data);
    return res.data;
  },

  changePassword: async (payload: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const res = await authApi.post("/change-password", payload);
    return res.data; // { message }
  }
};
