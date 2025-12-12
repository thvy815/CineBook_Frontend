// src/pages/Booking/TicketSelection.tsx
import React from "react";

export interface TicketSelectionProps {
  showtimeId: string;
  quantities: { [key: string]: number };
  setQuantities: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
}

const FIXED_TICKET_TYPES = [
  { key: "adult", label: "Vé Người Lớn" },
  { key: "child", label: "Vé Trẻ Em" },
  { key: "student", label: "Vé Học Sinh/Sinh Viên" },
];

export default function TicketSelection({
  showtimeId,
  quantities,
  setQuantities,
}: TicketSelectionProps) {
  return (
    <div className="text-white">
      <h1 className="text-4xl font-extrabold mb-8 tracking-widest">
        CHỌN VÉ
      </h1>

      {/* GRID CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FIXED_TICKET_TYPES.map((ticket) => (
          <div
            key={ticket.key}
            className="rounded-xl p-6 shadow-lg flex flex-col items-center justify-between 
                       min-h-[180px] w-full border border-yellow-400 hover:border-yellow-300 transition"
          >
            {/* Tên vé */}
            <div className="text-2xl font-bold mb-6 whitespace-nowrap">
              {ticket.label}
            </div>

            {/* Ô chọn số lượng */}
            <div className="flex items-center justify-center bg-yellow-800 py-2 rounded-lg text-center">
              <button
                className="px-4 py-2 rounded-lg hover:bg-gray-600 text-xl"
                onClick={() =>
                  setQuantities((prev) => ({
                    ...prev,
                    [ticket.key]: Math.max((prev[ticket.key] || 0) - 1, 0),
                  }))
                }
              >
                -
              </button>

              <span className="text-2xl font-semibold w-12 text-center">
                {quantities[ticket.key] || 0}
              </span>

              <button
                className="px-4 py-2 rounded-lg hover:bg-gray-600 text-xl"
                onClick={() =>
                  setQuantities((prev) => ({
                    ...prev,
                    [ticket.key]: (prev[ticket.key] || 0) + 1,
                  }))
                }
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
