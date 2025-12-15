import axios from "axios";

export interface Promotion {
  id: string;
  code: string;
  discountType: "PERCENT" | "FIXED";
  discountValue: number;
  isActive: boolean;
  description: string | null;
}

const api = axios.create({
  baseURL: "https://localhost:7186/api/pricing",
  headers: {
    "Content-Type": "application/json",
  },
});

export const promotionService = {
  getAll: async (): Promise<Promotion[]> => {
    const res = await api.get("/promotions");
    return res.data;
  },
};
