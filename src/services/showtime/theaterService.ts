import axios from "axios";
import type {
  TheaterDto,
  CreateTheaterDto,
  UpdateTheaterDto,
} from "../../types/theater";

const api = axios.create({
  baseURL: "https://localhost:7156/api/Theater",
  headers: { "Content-Type": "application/json" },
});

export const theaterService = {
  // GET ALL
  getAll: async (): Promise<TheaterDto[]> => {
    const res = await api.get("");
    return res.data;
  },

  // CREATE
  create: async (data: CreateTheaterDto): Promise<TheaterDto> => {
    const res = await api.post("", data);
    return res.data;
  },

  // UPDATE
  update: async (
    id: string,
    data: UpdateTheaterDto
  ): Promise<TheaterDto> => {
    const res = await api.put(`/${id}`, data);
    return res.data;
  },

  // FILTER BY PROVINCE + DATE
  filterByProvinceAndDate: async (
    provinceId: string | null,
    date: string
  ): Promise<TheaterDto[]> => {
    const res = await api.get("/filter-by-province", {
      params: {
        provinceId,
        date,
      },
    });
    return res.data;
  },
};
