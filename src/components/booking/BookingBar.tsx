import { useEffect, useState } from "react";
import type { SeatTicketDraft, FnbDraft } from "../../types/bookingDraft";

interface Props {
  movieName: string;
  theaterName: string;
  roomName: string;
  startTime: string;

  seats: SeatTicketDraft[];
  fnBs: FnbDraft[];

  totalPrice: number;
  canSubmit: boolean;
  onSubmit: () => void;
}

export default function BookingBar({
  movieName,
  theaterName,
  roomName,
  startTime,
  seats,
  fnBs,
  totalPrice,
  canSubmit,
  onSubmit,
}: Props) {
  const [time, setTime] = useState(300);

  useEffect(() => {
    const t = setInterval(() => setTime(v => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/95 border-t border-yellow-400 p-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-6">

        {/* LEFT INFO */}
        <div className="text-white text-base space-y-1">
          <p>🎬 <span className="text-yellow-300 text-lg font-bold">{movieName}</span></p>
          <p>🏢 {theaterName} – {roomName}</p>
          <p>⏰ Suất: {startTime}</p>

          <p>
            💺 Ghế:{" "}
            {seats.length
              ? seats.map(s => s.seatNumber).join(", ")
              : "Chưa chọn"}
          </p>

          {fnBs.length > 0 && (
            <p>
              🍿 Combo:{" "}
              {fnBs.map(f => `${f.name} x${f.quantity}`).join(", ")}
            </p>
          )}
        </div>

        {/* RIGHT ACTION */}
        <div className="flex items-center gap-6">
          <span className="text-yellow-400 font-bold text-lg">
            ⏳ {Math.floor(time / 60)}:
            {(time % 60).toString().padStart(2, "0")}
          </span>

          <button
            disabled={!canSubmit || time === 0}
            onClick={onSubmit}
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold
                       disabled:opacity-40"
          >
            Đặt vé – {totalPrice.toLocaleString()}₫
          </button>
        </div>
      </div>
    </div>
  );
}
