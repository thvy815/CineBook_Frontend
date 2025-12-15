import axios from "axios";
import type { FnbItem } from "../../types/fnbItem";

const api = axios.create({
  baseURL: "https://localhost:7186/api/pricing",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fnbService = {
  getAll: async (): Promise<FnbItem[]> => {
    const res = await api.get("/fnb-items");
    return res.data;
  },
};
