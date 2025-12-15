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
    return res.data; // trả về bookingId string
  },

  getBookingById: async (bookingId: string) => {
    const res = await api.get(`/${bookingId}`);
    return res.data; // trả về object booking chi tiết
  },

  createPayment: async (bookingId: string): Promise<{ orderUrl: string }> => {
    const res = await api.post(`/${bookingId}/payment`);
    return res.data;
  },
};
