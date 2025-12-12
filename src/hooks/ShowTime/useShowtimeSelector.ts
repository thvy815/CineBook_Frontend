import { useEffect, useState } from "react";
import { showtimeService } from "../../services/showtime/showtimeService";
import type { ShowtimeItem } from "../../types/showtime";

// Lấy 3 ngày gần nhất
const getNext3Days = () => {
  const result: string[] = [];
  const today = new Date();

  for (let i = 0; i < 3; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");

    result.push(`${yyyy}-${mm}-${dd}`);
  }
  return result;
};

export const useShowtimeSelector = () => {
  const [allShowtimes, setAllShowtimes] = useState<ShowtimeItem[]>([]);
  const [allTheaters, setAllTheaters] = useState<{ id: string; name: string }[]>([]);
  const [allMovies, setAllMovies] = useState<{ id: string; title: string }[]>([]);
  const [dates, setDates] = useState<string[]>(getNext3Days());
  const [times, setTimes] = useState<string[]>([]);

  // Selections
  const [selectedTheaterId, setSelectedTheaterId] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState("");

  // Hiển thị tên
  const selectedTheater = allTheaters.find(t => t.id === selectedTheaterId)?.name || "";
  const selectedMovie = allMovies.find(m => m.id === selectedMovieId)?.title || "";

  // -----------------------------------------------------
  // Load danh sách rạp ban đầu
  // -----------------------------------------------------
  useEffect(() => {
    const loadTheaters = async () => {
      const theaterList = await showtimeService.getAllTheater();
      setAllTheaters(theaterList.map((t: any) => ({ id: t.id, name: t.name })));
    };
    loadTheaters();
  }, []);

  // -----------------------------------------------------
  // Load showtime dựa trên filter (theaterId, movieId, date)
  // -----------------------------------------------------
 useEffect(() => {
  const fetchShowtimes = async () => {
    try {
      const filter: any = {};
      if (selectedTheaterId) filter.theaterId = selectedTheaterId;
      if (selectedMovieId) filter.movieId = selectedMovieId;
      if (selectedDate) filter.date = selectedDate;

      const response = await showtimeService.getByFilter(filter);

      // Chuẩn hóa dữ liệu
      const data = Array.isArray(response) ? response : response.showtimes ?? [];
      setAllShowtimes(data);

      // Lấy danh sách phim từ showtimes
      const movieSet = new Map<string, string>();
      data.forEach((st: ShowtimeItem) => {
        if (!movieSet.has(st.movieId)) movieSet.set(st.movieId, st.movieTitle);
      });
      setAllMovies([...movieSet.entries()].map(([id, title]) => ({ id, title })));

    } catch (err) {
      console.error("Lỗi fetch showtimes:", err);
      setAllShowtimes([]);
      setAllMovies([]);
    }
  };

  fetchShowtimes();
}, [selectedTheaterId, selectedMovieId, selectedDate]);

  // -----------------------------------------------------
  // Khi thay đổi ngày / phim / rạp → cập nhật giờ
  // -----------------------------------------------------
  useEffect(() => {
  let filteredTimes = allShowtimes;

  if (selectedTheaterId) filteredTimes = filteredTimes.filter(st => st.theaterId === selectedTheaterId);
  if (selectedMovieId) filteredTimes = filteredTimes.filter(st => st.movieId === selectedMovieId);
  if (selectedDate) filteredTimes = filteredTimes.filter(st => st.date === selectedDate);

  const timeSet = new Set(filteredTimes.map(st => st.startTime.substring(0, 5)));
  setTimes([...timeSet]);
}, [allShowtimes, selectedTheaterId, selectedMovieId, selectedDate]);

  return {
    allTheaters,
    allMovies,
    dates,
    times,

    selectedTheater,
    selectedMovie,
    selectedDate,
    selectedTime,
    selectedTheaterId,
    selectedMovieId,

    setSelectedTheaterId,
    setSelectedMovieId,
    setSelectedDate,
    setSelectedTime,

    allShowtimes
  };
};
