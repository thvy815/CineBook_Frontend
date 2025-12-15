export type SeatStatus = "Available" | "Booked" | "Blocked";

export type SeatType = "SINGLE" | "DOUBLE";

export interface ShowtimeItem {
  showtimeId: string;
  roomId: string;
  roomName: string;
  date: string;
  startTimeFormatted: string;
}

export interface TheaterShowtime {
  theaterId: string;
  theaterName: string;
  theaterAddress: string;
  showtimes: ShowtimeItem[];
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

