import axios from "axios";
import type { TheaterShowtime } from "../../types/showtime";

const api = axios.create({
  baseURL: "https://localhost:7156/api/Showtime",
  headers: { "Content-Type": "application/json" },
});

export const showtimeService = {
  filterByAll: async (
    provinceId: string,
    movieId: string,
    date: string
  ): Promise<TheaterShowtime[]> => {
    const res = await api.get("/filterByAll", {
      params: {
        provinceId,
        movieId,
        date
      }
    });
    return res.data;
  }
};
