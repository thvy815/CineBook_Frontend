import axios from "axios";
import type { MovieDetail } from "../../types/movie";
import type { PageResponse } from "../../types/PageResponse";

const movieManagementClient = axios.create({
  baseURL: "https://localhost:7194/api/MovieDetail",
  headers: {
    "Content-Type": "application/json",
  },
});

export const movieManagementService = {
  /* ===================== ADMIN SEARCH ===================== */
  adminList: async (params: {
    keyword?: string;
    status?: string;
    genres?: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortType?: string;
  }): Promise<PageResponse<MovieDetail>> => {
    const res = await movieManagementClient.get<PageResponse<MovieDetail>>(
      "/advanced-search",
      { params }
    );
    return res.data;
  },

  /* ===================== GET ALL ===================== */
  getAll: async (): Promise<MovieDetail[]> => {
    const res = await movieManagementClient.get<MovieDetail[]>("");
    return res.data;
  },

  /* ===================== GET BY ID ===================== */
  getById: async (id: string): Promise<MovieDetail> => {
    const res = await movieManagementClient.get<MovieDetail>(`/${id}`);
    return res.data;
  },

  /* ===================== CREATE ===================== */
  create: async (payload: MovieDetail): Promise<MovieDetail> => {
    const res = await movieManagementClient.post<MovieDetail>("", payload);
    return res.data;
  },

  /* ===================== UPDATE ===================== */
  update: async (
    id: string,
    payload: MovieDetail
  ): Promise<{ message: string }> => {
    const res = await movieManagementClient.put<{ message: string }>(
      `/${id}`,
      payload
    );
    return res.data;
  },

  /* ===================== DELETE ===================== */
  delete: async (id: string): Promise<{ message: string }> => {
    const res = await movieManagementClient.delete<{ message: string }>(
      `/${id}`
    );
    return res.data;
  },

  /* ===================== SEARCH ===================== */
  search: async (keyword: string): Promise<MovieDetail[]> => {
    const res = await movieManagementClient.get<MovieDetail[]>("/search", {
      params: { keyword },
    });
    return res.data;
  },

  /* ===================== FILTER BY STATUS ===================== */
  getByStatus: async (status: string): Promise<MovieDetail[]> => {
    const res = await movieManagementClient.get<MovieDetail[]>(
      `/status/${status}`
    );
    return res.data;
  },
};
