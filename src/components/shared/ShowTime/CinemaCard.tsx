import React from "react";
import type { ShowTimeItem } from "../../../types/showtime";

interface CinemaCardProps {
  cinemaName: string;
  showtimes: ShowTimeItem[];
  selectedShowtimeId: string;
  onSelectShowtime: (id: string) => void;
}

export default function CinemaCard({
  cinemaName,
  showtimes,
  selectedShowtimeId,
  onSelectShowtime,
}: CinemaCardProps) {
  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-700 hover:border-red-400 transition-all p-4">
      {/* --- Tên rạp --- */}
      <h3 className="text-xl font-semibold mb-4">{cinemaName}</h3>

      {/* --- Suất chiếu --- */}
      <div className="flex flex-wrap gap-3">
        {showtimes.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelectShowtime(s.id)}
            className={`px-4 py-2 rounded-lg text-sm transition-all
              ${
                selectedShowtimeId === s.id
                  ? "border-2 border-red-500 bg-gray-800 text-white"
                  : "border border-gray-600 hover:border-red-400 text-gray-300"
              }`}
          >
            {s.time}
          </button>
        ))}
      </div>
    </div>
  );
}
