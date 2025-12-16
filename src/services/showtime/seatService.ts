import axios from "axios";
import type {
  SeatDto,
  CreateSeatsRequest,
} from "../../types/seat";

const api = axios.create({
  baseURL: "https://localhost:7156/api/ShowtimeSeat",
  headers: {
    "Content-Type": "application/json",
  },
});

interface LockSeatRequest {
  showtimeId: string;
  seatId: string;
}

export const seatService = {
  lockSeat: async (payload: LockSeatRequest) => {
    const res = await api.post("/lock", payload);
    return res.data;
  },

  releaseSeat: async (payload: LockSeatRequest) => {
    const res = await api.post("/release", payload);
  },
  
  // GET SEATS BY ROOM
  getByRoom: async (roomId: string): Promise<SeatDto[]> => {
    const res = await api.get(`/${roomId}`);
    return res.data;
  },

  // GENERATE SEATS (ROWS / COLUMNS / DOUBLE)
  generate: async (
    data: CreateSeatsRequest
  ): Promise<SeatDto[]> => {
    const res = await api.post("/generate", data);
    return res.data;
  },
};
