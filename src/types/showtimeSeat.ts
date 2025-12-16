export interface ShowtimeSeatDto {
  id: string;
  showtimeId: string;
  seatId: string;
  seatCode: string;
  status: "Available" | "Locked" | "Booked";
}

/* ========= REQUEST DTOs ========= */

export interface LockSeatRequest {
  showtimeId: string;
  seatId: string;
}

export interface BookSeatsRequest {
  showtimeId: string;
  seatIds: string[];
}

export interface GenerateShowtimeSeatsRequest {
  showtimeId: string;
  seatCount: number;
}
