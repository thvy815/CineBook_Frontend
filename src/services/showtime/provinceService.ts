import axios from "axios";
import type {
  ProvinceDto,
  CreateProvinceDto,
  UpdateProvinceDto,
} from "../../types/province";

const api = axios.create({
  baseURL: "https://localhost:7156/api/Province",
  headers: { "Content-Type": "application/json" },
});

export const provinceService = {
  // GET ALL
  getAll: async (): Promise<ProvinceDto[]> => {
    const res = await api.get("");
    return res.data;
  },

  // GET BY ID
  getById: async (id: string): Promise<ProvinceDto> => {
    const res = await api.get(`/${id}`);
    return res.data;
  },

  // CREATE
  create: async (data: CreateProvinceDto): Promise<ProvinceDto> => {
    const res = await api.post("", data);
    return res.data;
  },

  // UPDATE
  update: async (
    id: string,
    data: UpdateProvinceDto
  ): Promise<ProvinceDto> => {
    const res = await api.put(`/${id}`, data);
    return res.data;
  },

  // DELETE
  delete: async (id: string): Promise<void> => {
    await api.delete(`/${id}`);
  },
};
