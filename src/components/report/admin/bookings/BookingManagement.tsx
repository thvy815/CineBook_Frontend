"use client";

import { useEffect, useState } from "react";
import { bookingService } from "../../../../services/booking/bookingService";
import type { BookingListDto } from "../../../../types/booking"; 

export default function BookingManagement() {
  const [bookings, setBookings] = useState<BookingListDto[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await bookingService.getAll();
      setBookings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#0B0F1A] text-white">
      <h1 className="text-2xl font-bold mb-6">
        Quản lý Booking
      </h1>

      {loading && (
        <div className="text-gray-400 mb-4">
          Đang tải dữ liệu...
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <div className="text-gray-400">
          Không có booking nào
        </div>
      )}

      {bookings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 bg-[#111827] rounded overflow-hidden">
            <thead className="bg-[#1F2937]">
              <tr>
                <th className="p-3 text-left text-gray-300">
                  Booking ID
                </th>
                <th className="p-3 text-left text-gray-300">
                  User
                </th>
                <th className="p-3 text-left text-gray-300">
                  Showtime
                </th>
                <th className="p-3 text-left text-gray-300">
                  Trạng thái
                </th>
                <th className="p-3 text-left text-gray-300">
                  Thanh toán
                </th>
                <th className="p-3 text-left text-gray-300">
                  Tổng tiền
                </th>
                <th className="p-3 text-left text-gray-300">
                  Ngày tạo
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-t border-gray-700 hover:bg-[#1F2937] transition"
                >
                  <td className="p-3 text-sm text-blue-400">
                    {b.id}
                  </td>

                  <td className="p-3 text-sm">
                    {b.userId}
                  </td>

                  <td className="p-3 text-sm">
                    {b.showtimeId}
                  </td>

                  <td className="p-3 text-sm">
                    <StatusBadge status={b.status} />
                  </td>

                  <td className="p-3 text-sm">
                    {b.paymentMethod || "-"}
                  </td>

                  <td className="p-3 text-sm font-semibold">
                    {b.finalPrice.toLocaleString()} ₫
                  </td>

                  <td className="p-3 text-sm text-gray-400">
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ================== STATUS BADGE ================== */
function StatusBadge({ status }: { status: string }) {
  const color =
    status === "SUCCESS"
      ? "bg-green-600"
      : status === "FAILED"
      ? "bg-red-600"
      : "bg-yellow-600";

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold ${color}`}
    >
      {status}
    </span>
  );
}
