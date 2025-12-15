export interface BookingSeatRequest {
  showtimeSeatId: string;
  seatType: string;
  ticketType: string;
  quantity: number;
  price: number;
}

export interface BookingFnbRequest {
  fnbItemId: string;
  quantity: number;
}

export interface CreateBookingRequest {
  userId: string;
  showtimeId: string;
  seats: BookingSeatRequest[];
  promotionCode?: string | null;
  fnBs: BookingFnbRequest[];
}
