import React, { useEffect, useState } from "react";
import {
  getAllShowtimes,
  filterShowtimes,
} from "../../services/showtime/showtimeService";
import type { ShowTimeItem } from "../../types/showtime";
import DateCard from "../../components/shared/ShowTime/DateCard";

interface ShowtimePageProps {
  showtime: ShowTimeItem;
}

export default function ShowtimePage({ showtime }: ShowtimePageProps) {
  const [allShowtimes, setAllShowtimes] = useState<ShowTimeItem[]>([]);
  const [days, setDays] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [provinces, setProvinces] = useState<string[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [filteredCinemas, setFilteredCinemas] = useState<ShowTimeItem[]>([]);
  const [selectedCinemaId, setSelectedCinemaId] = useState<string>("");
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string>("");

  // --- Khởi tạo ngày: hôm nay + 2 ngày sau ---
  useEffect(() => {
    const today = new Date();
    const arr: Date[] = [];
    for (let i = 0; i < 3; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }
    setDays(arr);
    if (showtime) {
      setSelectedDate(new Date(showtime.date));
    }
  }, [showtime]);

  // --- Lấy showtime và provinces dựa trên phim + ngày ---
  useEffect(() => {
    const fetchData = async () => {
      if (!showtime) return;
      const data = await getAllShowtimes();
      setAllShowtimes(data);

      const dateStr = selectedDate.toISOString().split("T")[0];
      const filtered = filterShowtimes(data, {
        movieId: showtime.movieId,
        date: dateStr,
      });

      const uniqueProvinces = Array.from(new Set(filtered.map((s) => s.province)));
      setProvinces(uniqueProvinces);

      const defaultProvince = uniqueProvinces.includes(showtime.province)
        ? showtime.province
        : uniqueProvinces[0] || "";
      setSelectedProvince(defaultProvince);

      const cinemas = filtered.filter((s) => s.province === defaultProvince);
      setFilteredCinemas(cinemas);
    };
    fetchData();
  }, [showtime, selectedDate]);

  // --- Khi user đổi province ---
  useEffect(() => {
    if (!selectedProvince || !showtime) return;
    const dateStr = selectedDate.toISOString().split("T")[0];
    const cinemas = allShowtimes.filter(
      (s) =>
        s.movieId === showtime.movieId &&
        s.date === dateStr &&
        s.province === selectedProvince
    );
    setFilteredCinemas(cinemas);
  }, [selectedProvince, selectedDate, allShowtimes, showtime]);

  if (!showtime) return <p className="text-white">Không có dữ liệu phim được chọn.</p>;

  // --- Nhóm suất chiếu theo rạp ---
  const groupedCinemas = filteredCinemas.reduce((acc, curr) => {
    if (!acc[curr.cinemaId]) {
      acc[curr.cinemaId] = {
        cinemaId: curr.cinemaId,
        cinemaName: curr.cinemaName,
        showtimes: [],
      };
    }
    acc[curr.cinemaId].showtimes.push({
      id: curr.id,
      time: curr.time,
      price: curr.price,
    });
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="min-h-screen text-white px-6 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-widest">
        LỊCH CHIẾU
      </h1>

      <div className="flex gap-5 mb-8 justify-center">
        {days.map((d) => (
          <DateCard
            key={d.toISOString()}
            date={d}
            selected={d.toDateString() === selectedDate.toDateString()}
            onClick={() => setSelectedDate(d)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center w-full max-w-5xl mb-8">
        <h2 className="text-2xl font-semibold tracking-wide">Danh sách rạp</h2>
        <select
          className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-400"
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
        >
          <option value="">Chọn tỉnh</option>
          {provinces.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-5xl">
        {selectedProvince ? (
          Object.keys(groupedCinemas).length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.values(groupedCinemas).map((cinema: any) => (
                <div
                  key={cinema.cinemaId}
                  className={`bg-gray-900 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedCinemaId === cinema.cinemaId
                      ? "border-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.6)]"
                      : "border-gray-700 hover:border-yellow-300"
                  }`}
                  onClick={() => {
                    setSelectedCinemaId(cinema.cinemaId);
                    setSelectedShowtimeId("");
                  }}
                >
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-center text-yellow-300">
                      {cinema.cinemaName}
                    </h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {cinema.showtimes.map((st: any) => (
                        <button
                          key={st.id}
                          className={`px-4 py-2 rounded-lg border-2 text-base font-medium transition-all ${
                            selectedShowtimeId === st.id
                              ? "border-yellow-400 text-yellow-400"
                              : "border-gray-600 hover:border-yellow-300"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedShowtimeId(st.id);
                            setSelectedCinemaId(cinema.cinemaId);
                          }}
                        >
                          {st.time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-center mt-10">
              Không có rạp nào ở tỉnh này chiếu phim.
            </p>
          )
        ) : (
          <p className="text-gray-400 italic text-center mt-10">
            Vui lòng chọn tỉnh để xem rạp chiếu.
          </p>
        )}
      </div>
    </div>
  );
}
