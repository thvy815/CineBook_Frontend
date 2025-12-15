import axios from "axios";
import type {
  SeatDto,
  CreateSeatsRequest,
} from "../../types/seat";

const api = axios.create({
  baseURL: "https://localhost:7156/api/Seat",
  headers: { "Content-Type": "application/json" },
});

export const seatService = {
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
