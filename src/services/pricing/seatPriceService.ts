import axios from "axios";
import type { SeatPrice } from "../../types/showtime";

const api = axios.create({
  baseURL: "https://localhost:7186/api/pricing",
  headers: {
    "Content-Type": "application/json",
  },
});

export const seatPriceService = {
  getSeatPrices: async (): Promise<SeatPrice[]> => {
    const res = await api.get("/seat-prices");
    return res.data;
  },
};
