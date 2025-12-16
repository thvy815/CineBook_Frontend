import axios from "axios";
import type { Seat } from "../../types/showtime";
import type {
  ShowtimeSeatDto,
  LockSeatRequest,
  BookSeatsRequest,
  GenerateShowtimeSeatsRequest,
} from "../../types/showtimeSeat";

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

  // ================= GET SEATS BY SHOWTIME =================
  getByShowtime: async (
    showtimeId: string
  ): Promise<ShowtimeSeatDto[]> => {
    const res = await api.get(`/${showtimeId}`);
    return res.data;
  },

  // ================= LOCK SEAT (TEMP) =================
  lockSeat: async (
    data: LockSeatRequest
  ): Promise<{ message: string }> => {
    const res = await api.post("/lock", data);
    return res.data;
  },

  // ================= RELEASE SEAT =================
  releaseSeat: async (
    data: LockSeatRequest
  ): Promise<{ message: string }> => {
    const res = await api.post("/release", data);
    return res.data;
  },

  // ================= BOOK SEATS =================
  bookSeats: async (
    data: BookSeatsRequest
  ): Promise<{ message: string }> => {
    const res = await api.post("/book", data);
    return res.data;
  },

  // ================= GENERATE SHOWTIME SEATS =================
  generate: async (
    data: GenerateShowtimeSeatsRequest
  ): Promise<{
    message: string;
    totalSeats: number;
  }> => {
    const res = await api.post("/generate", data);
    return res.data;
  },
};
