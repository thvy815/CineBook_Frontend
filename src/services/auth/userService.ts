// src/services/userAdminService.ts
import { authApi } from "./authApi";

export const userAdminService = {
  // =========================
  // GET ALL USERS (ADMIN)
  // =========================
  getAllUsers: async (params: {
    keyword?: string;
    status?: string;
    role?: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortType?: string;
  }) => {
    const res = await authApi.get("/users", { params });
    return res.data; // PagedResponse<User>
  },

  // =========================
  // DELETE ACCOUNT (ADMIN)
  // =========================
  deleteUser: async (id: string) => {
    // BE của bạn delete theo token, nếu muốn admin delete user khác
    // cần thêm API mới ở BE
    const res = await authApi.delete(`/account`);
    return res.data;
  },

  // =========================
  // STATS (TÍNH TỪ USERS)
  // =========================
  getStatsOverview: async () => {
    const res = await authApi.get("/users", {
      params: { page: 1, size: 10000 },
    });

    const users = res.data?.data ?? [];

    return {
      totalUsers: users.length,
      totalCustomers: users.filter((u: any) => u.role === "Customer").length,
      totalStaff: users.filter((u: any) => u.role === "Staff").length,
      totalManagers: users.filter((u: any) => u.role === "Manager").length,
      totalAdmins: users.filter((u: any) => u.role === "Admin").length,
    };
  },
    // =========================
  // UPDATE USER ROLE & STATUS (ADMIN)
  // =========================
  updateUserRoleStatus: async (
    userId: string,
    payload: {
      role: string;
      status: string;
    }
  ) => {
    const res = await authApi.put(`/users/${userId}`, payload);
    return res.data;
  },

    // =========================
  // ADMIN CREATE USER
  // =========================
  createUserByAdmin: async (payload: {
    email: string;
    username: string;
    password: string;
    role: string;
    status: string;
  }) => {
    const res = await authApi.post("/users", payload);
    return res.data;
  },

};