import axios from "axios";

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
    return res.data;
  },
};
