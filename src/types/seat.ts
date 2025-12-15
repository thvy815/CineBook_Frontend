export interface SeatDto {
  id: string;
  roomId: string;
  seatCode: string;
  seatType: string;
  status: string;
}

export interface CreateSeatsRequest {
  roomId: string;
  rows: number;
  columns: number;
  doubleSeats: number;
}
