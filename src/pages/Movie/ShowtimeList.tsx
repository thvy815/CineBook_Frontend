import { useShowtimeSelector } from "../../hooks/ShowTime/useShowtimeSelector";
import "../../components/shared/ShowTime/ShowTimeList.css";
import type { ShowtimeItem } from "../../types/showtime";
import { ChevronDown } from "lucide-react";

// -----------------------------------------------------
// 1. SelectFilter Component
// -----------------------------------------------------
function SelectFilter({ label, value, onChange, options, disabled }: any) {
  return (
    <div className="relative">
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full appearance-none px-4 py-3 pr-10 rounded-lg bg-[#181818] text-white border border-gray-500/70 font-semibold focus:border-red-500 focus:ring-2 focus:ring-red-500/60 outline-none transition shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] disabled:bg-[#2a2a2a] disabled:text-gray-500"
      >
        <option value="">{label}</option>
        {options.map((op: any) => (
          <option key={op.id} value={op.id}>
            {op.name || op.title}
          </option>
        ))}
      </select>

      <ChevronDown
        size={18}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  );
}

// -----------------------------------------------------
// 2. ShowtimeList Component
// -----------------------------------------------------
export default function ShowtimeList() {
  const {
    allTheaters,
    allMovies,
    dates,
    selectedTheaterId,
    selectedMovieId,
    selectedDate,
    setSelectedTheaterId,
    setSelectedMovieId,
    setSelectedDate,
    allShowtimes,
  } = useShowtimeSelector();

  // -----------------------------------------------------
  // Filter showtimes + fix kiểu dữ liệu
  // -----------------------------------------------------
  const filteredShowtimes = allShowtimes.filter(st => {
    const theaterMatch = selectedTheaterId ? st.theaterId.toString() === selectedTheaterId : true;
    const movieMatch   = selectedMovieId ? st.movieId.toString() === selectedMovieId : true;
    const dateMatch    = selectedDate ? st.date === selectedDate : true;
    return theaterMatch && movieMatch && dateMatch;
  });

  // -----------------------------------------------------
  // Group showtimes theo theater -> movie
  // -----------------------------------------------------
  const group = filteredShowtimes.reduce((acc: any, st: ShowtimeItem) => {
    if (!acc[st.theaterId]) acc[st.theaterId] = { name: st.theaterName, movies: {} };
    if (!acc[st.theaterId].movies[st.movieId])
      acc[st.theaterId].movies[st.movieId] = { title: st.movieTitle, slots: [] };

    acc[st.theaterId].movies[st.movieId].slots.push(st);
    return acc;
  }, {});

  return (
    <div className="showtime-page">

      {/* FILTER BAR */}
      <div className="relative w-full bg-gradient-to-r from-[#3a0d0d] via-[#4a1a1a] to-[#3a0d0d] rounded-2xl shadow-[0_0_25px_rgba(255,0,0,0.3)] border border-red-700/40 px-6 py-6 overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-yellow-700/5 to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center gap-5 w-full relative z-10">
          <h2 className="text-2xl font-extrabold text-yellow-400 whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,200,0,0.4)]">
            LỌC SUẤT CHIẾU
          </h2>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SelectFilter
              label="Tất cả Rạp"
              value={selectedTheaterId || ""}
              onChange={setSelectedTheaterId}
              options={allTheaters}
            />
            <SelectFilter
              label="Chọn Ngày"
              value={selectedDate || ""}
              onChange={setSelectedDate}
              options={dates.map(d => ({ id: d, name: d }))}
            />
            <SelectFilter
              label="Tất cả Phim"
              value={selectedMovieId || ""}
              onChange={setSelectedMovieId}
              options={allMovies}
            />
          </div>
        </div>
      </div>

      {/* SHOWTIME LIST */}
      <div className="showtime-list">
        {Object.entries(group).map(([theaterId, theater]: any) => (
          <div key={theaterId} className="cinema-block">
            <h2 className="cinema-title">{theater.name}</h2>

            {Object.entries(theater.movies).map(([movieId, movie]: any) => (
              <div key={movieId} className="movie-row">
                <img
                  src={movie.slots[0].posterUrl || "/placeholder.png"}
                  className="movie-poster"
                  alt={movie.title}
                />
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-address">{movie.slots[0].theaterAddress}</p>
                </div>
                <div className="time-slots">
                  {movie.slots.map((slot: ShowtimeItem) => (
                    <div key={slot.id} className="time-box">
                      {slot.startTime.substring(0, 5)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
