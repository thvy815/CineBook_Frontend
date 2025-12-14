import axios from "axios";
import type { UserProfile, UserProfileUpdate } from "../../types/userProfile";

const api = axios.create({
  baseURL: "https://localhost:7217/api/UserProfile",
  headers: { "Content-Type": "application/json" },
});

export const userProfileService = {
  getByUserId: async (userId: string): Promise<UserProfile> => {
    const res = await api.get(`/by-user/${userId}`);
    return res.data;
  },

  updateByUserId: async (userId: string, data: UserProfileUpdate) => {
    const res = await api.put(`/by-user/${userId}`, data);
    return res.data;
  },

  updateAvatar: async (userId: string, avatarUrl: string) => {
    const res = await api.put(`/${userId}/avatar`, {
      avatarUrl
    });
    return res.data;
  }
};