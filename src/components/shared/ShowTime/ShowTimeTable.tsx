// src/components/shared/ShowTime/ShowtimeTable.tsx
import React from "react";
import type { ShowTimeItem } from "../../../types/showtime";

interface Props {
  showtimes: ShowTimeItem[];
}

const ShowtimeTable: React.FC<Props> = ({ showtimes }) => {
  if (!showtimes.length) return <p className="text-gray-500 mt-4">Không có suất chiếu</p>;

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {showtimes.map((st) => (
        <div key={st.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold">{st.movieTitle}</h3>
          <p className="text-gray-600">{st.cinemaName}</p>
          <p className="text-gray-600">{st.date} - {st.time}</p>
          <p className="text-indigo-600 font-bold">{st.price.toLocaleString()} VND</p>
          <button className="mt-2 w-full bg-indigo-600 text-white py-1 rounded hover:bg-indigo-700 transition">
            Chọn ghế
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShowtimeTable;
