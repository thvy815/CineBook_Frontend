import React, { useEffect, useState } from "react";
import SeatItem from "../../components/shared/SeatMap/SeatItem";
import { seatService } from "../../services/showtime/seatService";
import { seatSocket } from "../../services/showtime/seatSocket";

export type Seat = {
  id: string;
  seatNumber: string;
  rowLabel: string;
  columnIndex: number;
  type: string;
  status?: "available" | "locked" | "booked";
  owner?: string;
};

type Props = {
  showtimeId: string;
  roomId: string;
  userId: string;
  remainingTickets: number;                      // thêm
  selectedSeats: string[];                       // thêm
  setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>;  // thêm
};

export default function SeatMapPage({ showtimeId, roomId, userId }: Props) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Fetch ghế khi component mount
  const fetchSeats = async () => {
    try {
      const res = await seatService.getSeats(roomId);
      setSeats(res.data);
    } catch (err) {
      console.error("Fetch seats error:", err);
    }
  };

  useEffect(() => {
    fetchSeats();

    // Kết nối SignalR
    seatSocket.connect(showtimeId, (msg) => {
      setSeats((prev) =>
        prev.map((s) =>
          s.seatNumber === msg.seat
            ? {
                ...s,
                status: msg.locked ? "locked" : "available",
                owner: msg.user,
              }
            : s
        )
      );
    });

    // Cleanup khi unmount
    return () => {
      seatSocket.connection?.stop();
    };
  }, [roomId, showtimeId]);

  // Chọn/bỏ chọn ghế
  const handleSelectSeat = async (seat: Seat) => {
    if (seat.status === "locked" && seat.owner !== userId) {
      alert("Ghế này đã bị người khác giữ!");
      return;
    }

    const isSelected = selectedSeats.includes(seat.seatNumber);

    if (isSelected) {
      // Bỏ chọn => unlock
      try {
        await seatSocket.releaseSeat(showtimeId, seat.seatNumber, userId);
        setSelectedSeats((prev) =>
          prev.filter((x) => x !== seat.seatNumber)
        );
      } catch (err) {
        console.error("Release seat error:", err);
      }
    } else {
      // Chọn => lock
      try {
        await seatSocket.lockSeat(showtimeId, seat.seatNumber, userId);
        setSelectedSeats((prev) => [...prev, seat.seatNumber]);
      } catch (err) {
        console.error("Lock seat error:", err);
        alert("Không thể giữ ghế, vui lòng thử lại!");
      }
    }
  };

  // Tạo danh sách row
  const rows = Array.from(new Set(seats.map((s) => s.rowLabel))).sort();

  return (
    <div className="text-white px-6 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">CHỌN GHẾ</h1>

      <div className="w-full max-w-6xl">
        {rows.map((row) => (
          <div key={row} className="flex gap-4 items-center mb-4">
            <div className="w-6">{row}</div>

            <div className="flex gap-3">
              {seats
                .filter((s) => s.rowLabel === row)
                .sort((a, b) => a.columnIndex - b.columnIndex)
                .map((seat) => (
                  <SeatItem
                    key={seat.seatNumber}
                    seatId={seat.seatNumber}
                    seatNumber={seat.seatNumber}
                    rowLabel={seat.rowLabel}
                    columnIndex={seat.columnIndex}
                    type={seat.type}
                    status={seat.status}
                    isSelected={selectedSeats.includes(seat.seatNumber)}
                    onSelect={() => handleSelectSeat(seat)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
