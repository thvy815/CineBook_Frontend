import axios from "axios";
import type {
  PromotionDto,
  UpdatePromotionRequest,
} from "../../types/promotion";

const api = axios.create({
  baseURL: "https://localhost:7186/api/pricing",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Promotion {
  id: string;
  code: string;
  discountType: "PERCENT" | "FIXED";
  discountValue: number;
  isActive: boolean;
  description: string | null;
}

export const promotionService = {
  getAll: async (): Promise<Promotion[]> => {
    const res = await api.get("/promotions");
    return res.data;
  },

  // ================= GET ALL PROMOTIONS =================
  getAll1: async (): Promise<PromotionDto[]> => {
    const res = await api.get("");
    return res.data;
  },

  // ================= UPDATE PROMOTION =================
  update: async (
    id: string,
    data: UpdatePromotionRequest
  ): Promise<PromotionDto> => {
    const res = await api.put(`/${id}`, data);
    return res.data;
  },
};
