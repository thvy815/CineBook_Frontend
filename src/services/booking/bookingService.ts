import axios from "axios";
import type {
  BookingListDto,
  BookingDetailDto,
  CreateBookingRequest,
} from "../../types/booking";

const api = axios.create({
  baseURL: "https://localhost:7023/api/bookings", // ⚠️ đổi đúng port BookingService
  headers: {
    "Content-Type": "application/json",
  },
});

export const bookingService = {
  // ================= CREATE BOOKING =================
  createBooking: async (data: CreateBookingRequest): Promise<{
    bookingId: string;
  }> => {
    const res = await api.post("", data);
    return res.data;
  },

  // ================= GET ALL BOOKINGS (ADMIN) =================
  getAll: async (): Promise<BookingListDto[]> => {
    const res = await api.get("");
    return res.data;
  },

  // ================= GET BOOKING BY ID =================
  getById: async (bookingId: string): Promise<BookingDetailDto> => {
    const res = await api.get(`/${bookingId}`);
    return res.data;
  },

  // ================= CREATE PAYMENT =================
  createPayment: async (
    bookingId: string
  ): Promise<{ orderUrl: string }> => {
    const res = await api.post(`/${bookingId}/payment`);
    return res.data;
  },
};
