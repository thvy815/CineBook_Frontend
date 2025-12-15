import { useState } from "react";
import type { Seat } from "../../types/showtime";
import { seatService } from "../../services/showtime/seatService";

interface Props {
  showtimeId: string;
  roomName: string;
  seats: Seat[];
  maxSeats: number;
  selectedSeats: string[];
  onChange: (v: string[]) => void;
}

export default function SeatSelector({ showtimeId, roomName, seats, maxSeats, selectedSeats, onChange }: Props) {

  const [error, setError] = useState<string | null>(null);

  const toggleSeat = async (seat: Seat) => {
    setError(null);

    if (seat.status !== "Available") return;

    const size = seat.seatType === "DOUBLE" ? 2 : 1;
    const isSelected = selectedSeats.includes(seat.seatNumber);

    // Tính tổng số ghế đang chọn
    const currentSeatCount = selectedSeats.reduce((sum, s) => {
      const seatObj = seats.find(x => x.seatNumber === s);
      return sum + (seatObj?.seatType === "DOUBLE" ? 2 : 1);
    }, 0);

    try {
      if (isSelected) {
        // Hủy chọn -> release seat
        await seatService.releaseSeat({
          showtimeId: showtimeId, 
          seatId: seat.id, //showtimeSeatId
        });

        onChange(selectedSeats.filter(s => s !== seat.seatNumber));
        return;
      }

      if (currentSeatCount + size > maxSeats) {
        setError(`❌ Bạn chỉ được chọn tối đa ${maxSeats} ghế`);
        return;
      }

      // Chọn ghế -> lock seat
      await seatService.lockSeat({
        showtimeId: showtimeId,
        seatId: seat.id,
      });

      onChange([...selectedSeats, seat.seatNumber]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Đã có lỗi xảy ra");
    }
  };

  // 📌 Group ghế theo hàng
  const rows = seats.reduce<Record<string, Seat[]>>((acc, seat) => {
    acc[seat.rowLabel] ||= [];
    acc[seat.rowLabel].push(seat);
    return acc;
  }, {});

  // Sort rows theo ABC
  const sortedRows = Object.keys(rows).sort().reduce<Record<string, Seat[]>>((acc, row) => {
    // Sort seatNumber theo số (1,2,3...), giả sử seatNumber = "A1", "B2", ...
    acc[row] = rows[row].sort((a, b) => {
      const numA = parseInt(a.seatNumber.replace(/^\D+/, ""), 10);
      const numB = parseInt(b.seatNumber.replace(/^\D+/, ""), 10);
      return numA - numB;
    });
    return acc;
  }, {});

  return (
    <section className="bg-[#0b1020] rounded-2xl p-6 mt-6 border border-white/10">

      {/* Title */}
      <h3 className="text-center text-yellow-300 text-2xl font-bold mb-4">
        CHỌN GHẾ - {roomName}
      </h3>

      {/* Screen */}
      <div className="relative mb-8">
        <div className="mx-auto w-4/5 h-[3px] bg-white rounded-full" />
        <p className="text-center text-sm text-white/70 mt-2">Màn hình</p>
      </div>

      {/* Seats */}
      <div className="space-y-2">
        {Object.entries(sortedRows).map(([row, rowSeats]) => (
          <div key={row} className="flex items-center gap-3 justify-center">

            {/* Row label */}
            <span className="w-6 text-white/60 text-sm">{row}</span>

            <div className="flex gap-2">
              {rowSeats.map(seat => {
                const isSelected = selectedSeats.includes(seat.seatNumber);
                const isDisabled = seat.status !== "Available";

                return (
                  <button
                    key={seat.id}
                    disabled={isDisabled}
                    onClick={() => toggleSeat(seat)}
                    className={`
                      ${seat.seatType === "DOUBLE" ? "w-[64px]" : "w-7"}
                      h-7 rounded-md text-sm font-semibold transition-all
                      
                      ${
                        isSelected
                          ? "bg-yellow-400 text-black scale-105"
                          : isDisabled
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : seat.seatType === "DOUBLE"
                              ? "bg-blue-400 text-black hover:ring-2 hover:ring-yellow-400"
                              : "bg-white text-black hover:ring-2 hover:ring-yellow-400"
                      }
                    `}
                  >
                    {seat.seatNumber}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-center mt-4 font-semibold">
          {error}
        </p>
      )}

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 text-sm text-white">
        <Legend color="bg-white" label="Ghế thường" />
        <Legend color="bg-blue-400 w-10" label="Ghế đôi" />
        <Legend color="bg-yellow-400" label="Ghế đã chọn" />
        <Legend color="bg-gray-600" label="Ghế đã đặt" />
      </div>
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-6 h-4 ${color} rounded-sm border border-white/30`} />
      <span>{label}</span>
    </div>
  );
}
