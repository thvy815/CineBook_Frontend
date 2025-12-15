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

export const promotionService = {
  // ================= GET ALL PROMOTIONS =================
  getAll: async (): Promise<PromotionDto[]> => {
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
