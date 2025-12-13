import axios from "axios";
import type { Province } from "../../types/province";

const api = axios.create({
  baseURL: "https://localhost:7156/api/Province",
  headers: { "Content-Type": "application/json" },
});

export const provinceService = {
  getAll: async (): Promise<Province[]> => {
    const res = await api.get("");
    return res.data;
  }
};
