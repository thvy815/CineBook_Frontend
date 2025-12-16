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

export interface BookingListDto {
  id: string;
  userId: string;
  showtimeId: string;
  status: string;
  paymentMethod: string;
  transactionId: string;
  finalPrice: number;
  createdAt: string;
}
export interface BookingDetailDto {
  id: string;
  userId: string;
  showtimeId: string;
  status: string;
  paymentMethod: string;
  transactionId: string;
  totalPrice: number;
  discountAmount: number;
  finalPrice: number;
  createdAt: string;
  updatedAt: string;
  version: number;

  seats: BookingSeatDto[];
  promotion?: BookingPromotionDto | null;
  bookingFnb?: BookingFnbDto[] | null;
}
export interface BookingSeatDto {
  id: string;
  bookingId: string;
  seatId: string;
  seatType: string;
  ticketType: string;
  price: number;
}
export interface BookingPromotionDto {
  id: string;
  bookingId: string;
  promotionCode: string;
  discountType: string;
  discountValue: number;
}
export interface BookingFnbDto {
  id: string;
  bookingId: string;
  fnbItemId: string;
  quantity: number;
  unitPrice: number;
  totalFnbPrice: number;
}
