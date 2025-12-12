import axios from "axios";
import { ENDPOINTS } from "../../utils/constants";

export const seatService = {
  getSeats: (roomId: string) => axios.get(ENDPOINTS.SEAT.GET_BY_ROOM(roomId)),

  lockSeats: (showtimeId: string, seats: string[], userId: string) =>
    axios.post(ENDPOINTS.SEAT_LOCK.LOCK, {
      showtimeId,
      seatNumbers: seats,
      userId,
    }),

  verifySeats: (showtimeId: string, seats: string[], userId: string) =>
    axios.post(ENDPOINTS.SEAT_LOCK.VERIFY, {
      showtimeId,
      seatNumbers: seats,
      userId,
    }),

  markBooked: (showtimeId: string, seats: string[], userId: string) =>
    axios.post(ENDPOINTS.SEAT_LOCK.MARK_BOOKED, {
      showtimeId,
      seatNumbers: seats,
      userId,
    }),

  generateSeats: (rows: number, columns: number) =>
    axios.post(ENDPOINTS.SEAT.GENERATE, { rows, columns }),
};
