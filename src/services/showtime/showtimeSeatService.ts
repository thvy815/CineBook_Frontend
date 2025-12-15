import axios from "axios";
import type { Seat } from "../../types/showtime";

const api = axios.create({
  baseURL: "https://localhost:7156/api/ShowtimeSeat",
  headers: {
    "Content-Type": "application/json",
  },
});

export const showtimeSeatService = {
  getByShowtimeId: async (showtimeId: string): Promise<Seat[]> => {
    const res = await api.get(`/${showtimeId}`);
    return res.data;
  },
};
