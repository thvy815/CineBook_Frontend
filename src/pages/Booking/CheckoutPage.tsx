import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookingService } from "../../services/booking/bookingService";
import { SiZalo } from "react-icons/si";

interface Seat {
  id: string;
  seatId: string;
  seatType: string;
  ticketType: string;
  price: number;
  createdAt: string;
  seatNumber: string;
}

interface BookingFnb {
  fnbItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface Booking {
  id: string;
  userId: string;
  showtimeId: string;
  theaterName: string;
  roomName: string;
  startTime: string;
  movieName: string;
  status: string;
  paymentMethod: string;
  transactionId: string;
  totalPrice: number;
  discountAmount: number;
  finalPrice: number;
  createdAt: string;
  updatedAt: string;
  seats: Seat[];
  bookingFnb?: BookingFnb[] | null;
  promotion?: { code: string; discountType: string; discountValue: number } | null;
}

export default function CheckoutPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooking() {
      if (!bookingId) return;
      try {
        const data = await bookingService.getBookingById(bookingId);
        setBooking(data);
      } catch (err) {
        console.error("Fetch booking failed:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [bookingId]);

  if (loading) return <p className="text-white">Đang tải thông tin booking...</p>;
  if (!booking) return <p className="text-white">Không tìm thấy booking</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
        {/* Header trang */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl shadow-lg p-6 mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-black">Trang Thanh Toán</h1>
        </div>

        <div className="flex gap-6 p-6 mt-16">
            {/* LEFT: Payment */}
            <div className="flex-1 bg-gradient-to-b from-yellow-400 to-yellow-300 p-6 rounded-xl shadow-lg">
                <h2 className="text-black text-xl font-bold mb-4">Phương thức thanh toán</h2>
                <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-md cursor-pointer">
                    <input type="radio" name="payment" value="zalopay" defaultChecked />
                    <SiZalo className="w-12 h-12 text-blue-500" />
                    <span className="font-bold text-black">ZaloPay</span>
                </label>

                <button className="mt-4 bg-black text-yellow-400 font-bold px-6 py-3 rounded-xl hover:bg-gray-900"
                        onClick={async () => {
                            try {
                            const { orderUrl } = await bookingService.createPayment(booking.id);
                            // Chuyển hướng sang cổng thanh toán
                            window.location.href = orderUrl;
                            } catch (err) {
                            console.error("Thanh toán thất bại:", err);
                            alert("Thanh toán thất bại, vui lòng thử lại");
                            }
                        }}>
                    Thanh toán {booking.finalPrice.toLocaleString()}₫
                </button>
                </div>
            </div>

            {/* RIGHT: Booking summary */}
            <div className="flex-1 bg-blue-900 p-6 rounded-xl text-white shadow-lg">
                <h2 className="text-xl font-bold mb-4">{booking.movieName}</h2>
                <p>Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)</p>
                <p className="mt-2">🏢 {booking.theaterName}</p>
                <p>Phòng chiếu: {booking.roomName}</p>
                <p>Thời gian: {new Date(booking.startTime).toLocaleString()}</p>

                <hr className="my-2 border-yellow-400" />

                <p>🎫 Số vé: {booking.seats.length}</p>
                <ul className="ml-4 list-disc">
                {booking.seats.map((s) => (
                    <li key={s.id}>
                    {s.ticketType} – Ghế {s.seatNumber} – {s.seatType}
                    </li>
                ))}
                </ul>

                {booking.bookingFnb && booking.bookingFnb.length > 0 && (
                <>
                    <p className="mt-2">🍿 Bắp nước / Combo:</p>
                    <ul className="ml-4 list-disc">
                    {booking.bookingFnb.map((f) => (
                        <li key={f.fnbItemId}>
                        {f.name} x{f.quantity} – {(f.unitPrice * f.quantity).toLocaleString()}₫
                        </li>
                    ))}
                    </ul>
                </>
                )}

                <hr className="my-2 border-yellow-400" />

                {booking.promotion && (
                <p className="text-green-400 font-bold">
                    🏷️ Mã giảm giá: {booking.promotion.code} – Giảm {booking.discountAmount.toLocaleString()}₫
                </p>
                )}

                <p className="text-yellow-400 font-bold text-2xl mt-4">
                SỐ TIỀN CẦN THANH TOÁN: {booking.finalPrice.toLocaleString()}₫
                </p>
            </div>
        </div>
    </div>
  );
}
