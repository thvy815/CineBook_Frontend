export type SeatStatus = "Available" | "Booked" | "Blocked";

export type SeatType = "SINGLE" | "DOUBLE";

export interface ShowtimeItem {
  showtimeId: string;
  roomId: string;
  roomName: string;
  date: string;
  startTimeFormatted: string;
}

export interface ShowtimeDto {
  id: string;

  movieId: string;
  movieTitle: string;
  posterUrl: string;

  theaterId: string;
  theaterName: string;
  theaterAddress: string;

  roomId: string;
  roomName: string;

  startTime: string;              // ISO datetime
  startTimeFormatted: string;     // "10:41"
  date: string;                   // "2025-12-16"
}

export interface CreateShowtimeDto {
  movieId: string;
  theaterId: string;
  roomId: string;
  startTime: string;
  endTime: string;
  price: number;
  status: string;
}

/**
 * dùng cho filterByAll (group theo rạp)
 */
export interface TheaterShowtime {
  theaterId: string;
  theaterName: string;
  showtimes: ShowtimeDto[];
}

export interface Seat {
  id: string;
  rowLabel: string;
  columnIndex: number;
  seatNumber: string;
  seatType: SeatType;   
  status: SeatStatus;
}

export interface SeatPrice {
  id: string;
  seatType: "SINGLE" | "NORMAL" | "DOUBLE";
  ticketType: "ADULT" | "CHILDREN" | "STUDENT";
  basePrice: number;
  description?: string;
}

