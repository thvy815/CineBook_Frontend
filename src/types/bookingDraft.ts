export interface SeatTicketDraft {
  showtimeSeatId: string;
  seatNumber: string;
  seatType: string;
  ticketType: string;
  price: number;
}

export interface FnbDraft {
  fnbItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface BookingDraft {
  showtimeId: string;
  seats: SeatTicketDraft[];
  fnBs: FnbDraft[];
  totalPrice: number;
}
