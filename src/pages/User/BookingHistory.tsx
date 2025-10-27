import React, { useState } from "react";
import { TicketX } from "lucide-react"; 

interface Purchase {
  id: string;
  movieTitle: string;
  theaterName: string;
  showtime: string;
  seats: string[];
  totalPrice: number;
  paymentMethod: string;
  bookingDate: string;
  status: string;
}

const BookingHistory: React.FC = () => {
  const [booking] = useState<Purchase[]>([
    {
      id: "BKG123456",
      movieTitle: "Inside Out 2",
      theaterName: "CGV Aeon Tân Phú",
      showtime: "2025-10-21 19:30",
      seats: ["A5", "A6"],
      totalPrice: 180000,
      paymentMethod: "Ví Momo",
      bookingDate: "2025-10-20 15:10",
      status: "Hoàn tất",
    },
    {
      id: "BKG123457",
      movieTitle: "Venom: The Last Dance",
      theaterName: "Lotte Cộng Hòa",
      showtime: "2025-10-18 20:00",
      seats: ["C3", "C4"],
      totalPrice: 220000,
      paymentMethod: "Thẻ Visa",
      bookingDate: "2025-10-17 11:45",
      status: "Hoàn tất",
    },
  ]);

  return (
    <div className="flex-1 text-white">
      <h2 className="text-2xl font-bold mb-4 mt-3">LỊCH SỬ ĐẶT VÉ</h2>
      <div className="bg-white text-black p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Danh sách vé đã đặt</h3>

        {/* Nếu không có dữ liệu */}
        {booking.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <TicketX size={48} className="mb-3 text-gray-400" />
            <p className="text-lg font-medium">Bạn chưa có đơn đặt vé nào</p>
            <p className="text-sm text-gray-400 mt-1">
              Hãy đặt vé để bắt đầu trải nghiệm nhé 🎬
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {booking.map((booking) => (
              <div
                key={booking.id}
                className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg">
                    🎬 {booking.movieTitle}
                  </h4>
                  <span className="text-sm text-gray-500">
                    Mã đơn: {booking.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <p>
                    <strong>Rạp:</strong> {booking.theaterName}
                  </p>
                  <p>
                    <strong>Suất chiếu:</strong> {booking.showtime}
                  </p>
                  <p>
                    <strong>Ghế:</strong> {booking.seats.join(", ")}
                  </p>
                  <p>
                    <strong>Ngày đặt:</strong> {booking.bookingDate}
                  </p>
                  <p>
                    <strong>Tổng tiền:</strong>{" "}
                    {booking.totalPrice.toLocaleString("vi-VN")}₫
                  </p>
                  <p>
                    <strong>Thanh toán:</strong> {booking.paymentMethod}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        booking.status === "Hoàn tất"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
