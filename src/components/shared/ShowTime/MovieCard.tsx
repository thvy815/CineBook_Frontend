// src/components/shared/ShowTime/MovieCard.tsx
import React from "react";
import type { ShowTimeItem } from "../../../types/showtime";

interface Props {
  movie: ShowTimeItem;
  showtimes: ShowTimeItem[];
  onSelectShowtime: (showtime: ShowTimeItem) => void;
  selectedShowtimeId?: string | null;
}

const MovieCard: React.FC<Props> = ({
  movie,
  showtimes,
  onSelectShowtime,
  selectedShowtimeId,
}) => {
  const groupedByCinema = showtimes.reduce((acc: any, curr) => {
    if (!acc[curr.cinemaName]) acc[curr.cinemaName] = [];
    acc[curr.cinemaName].push(curr);
    return acc;
  }, {});

  return (
    <div className="w-full border border-gray-700 rounded-xl p-4 shadow-lg flex gap-6">
      {/* Cột trái: Poster + thông tin phim */}
      <div className="w-1/4 flex flex-col items-start">
        <img
          src={movie.posterUrl || "https://via.placeholder.com/250x350"}
          alt={movie.movieTitle}
          className="w-full h-72 object-cover rounded-lg shadow-md"
        />
        <div className="mt-3 text-left">
          <h2 className="text-yellow-400 font-bold text-xl">{movie.movieTitle}</h2>
          <p className="text-gray-300 text-sm mt-1">
            Thể loại: {movie.genre || "Đang cập nhật"}
          </p>
          <p className="text-gray-300 text-sm">
            Thời lượng: {movie.duration || "N/A"} phút
          </p>
        </div>
      </div>

      {/* Cột phải: danh sách rạp + suất chiếu */}
      <div className="flex-1 flex flex-col gap-6">
        {Object.entries(groupedByCinema).map(([cinemaName, times]: any) => (
          <div key={cinemaName} className="flex border-b border-gray-700 pb-3">
            <div className="w-1/3 pr-4">
              <h3 className="text-yellow-400 font-semibold text-base mb-2">
                Rạp phim
              </h3>
              <div className="text-white font-medium">{cinemaName}</div>
            </div>

            {/* Cột 3: Suất chiếu */}
            <div className="flex-1">
              <h3 className="text-yellow-400 font-semibold text-base mb-2">
                Suất chiếu
              </h3>
              <div className="flex flex-wrap gap-2">
                {times.map((t: ShowTimeItem) => {
                  const isSelected = selectedShowtimeId === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => onSelectShowtime(t)}
                      className={`px-3 py-1 text-sm rounded-md border transition ${
                        isSelected
                          ? "bg-yellow-500 text-black border-yellow-400"
                          : "bg-black-800 text-white border-gray-600 hover:bg-yellow-500 hover:text-black"
                      }`}
                    >
                      {t.time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
