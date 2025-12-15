import axios from "axios";
import type { CreateBookingRequest } from "../../types/booking";

const api = axios.create({
  baseURL: "https://localhost:7023/api/bookings",
  headers: {
    "Content-Type": "application/json",
  },
});

export const bookingService = {
  createBooking: async (payload: CreateBookingRequest) => {
    const res = await api.post("", payload);
    return res.data;
  },
};
