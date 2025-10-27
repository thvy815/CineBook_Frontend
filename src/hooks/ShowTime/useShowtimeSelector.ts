import { useEffect, useState, useMemo } from "react";
import type { ShowTimeItem } from "../../types/showtime";
import { getAllShowtimes, getDistinctDates, getDistinctMovies, getDistinctCinemas, filterShowtimes } from "../../services/showtime/showtimeService";

export const useShowtimeSelector = () => {
  const [all, setAll] = useState<ShowTimeItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMovieId, setSelectedMovieId] = useState<string>("");
  const [selectedCinemaId, setSelectedCinemaId] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getAllShowtimes().then((data) => {
      if (!mounted) return;
      setAll(data);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  // Tính toán các showtimes dựa trên selection hiện tại
  const filtered = useMemo(() => 
    filterShowtimes(all, {
      date: selectedDate || undefined,
      movieId: selectedMovieId || undefined,
      cinemaId: selectedCinemaId || undefined
    }),
    [all, selectedDate, selectedMovieId, selectedCinemaId]
  );

  // Các dropdown options dựa trên selections còn lại
  const availableDates = useMemo(() =>
    getDistinctDates(filterShowtimes(all, { movieId: selectedMovieId || undefined, cinemaId: selectedCinemaId || undefined })),
    [all, selectedMovieId, selectedCinemaId]
  );

  const availableMovies = useMemo(() =>
    getDistinctMovies(filterShowtimes(all, { date: selectedDate || undefined, cinemaId: selectedCinemaId || undefined })),
    [all, selectedDate, selectedCinemaId]
  );

  const availableCinemas = useMemo(() =>
    getDistinctCinemas(filterShowtimes(all, { date: selectedDate || undefined, movieId: selectedMovieId || undefined })),
    [all, selectedDate, selectedMovieId]
  );

  // Helper để reset selection nếu không còn hợp lệ
  const safeSetSelection = (
    type: "date" | "movie" | "cinema",
    value: string
  ) => {
    switch (type) {
      case "date":
        setSelectedDate(value);
        if (selectedMovieId && !filterShowtimes(all, { date: value, movieId: selectedMovieId }).length) setSelectedMovieId("");
        if (selectedCinemaId && !filterShowtimes(all, { date: value, cinemaId: selectedCinemaId }).length) setSelectedCinemaId("");
        break;
      case "movie":
        setSelectedMovieId(value);
        if (selectedDate && !filterShowtimes(all, { date: selectedDate, movieId: value }).length) setSelectedDate("");
        if (selectedCinemaId && !filterShowtimes(all, { movieId: value, cinemaId: selectedCinemaId }).length) setSelectedCinemaId("");
        break;
      case "cinema":
        setSelectedCinemaId(value);
        if (selectedDate && !filterShowtimes(all, { date: selectedDate, cinemaId: value }).length) setSelectedDate("");
        if (selectedMovieId && !filterShowtimes(all, { movieId: selectedMovieId, cinemaId: value }).length) setSelectedMovieId("");
        break;
    }
  };

  return {
    loading,
    all,
    selectedDate,
    selectedMovieId,
    selectedCinemaId,
    availableDates,
    availableMovies,
    availableCinemas,
    showtimesResult: filtered,
    onSelectDate: (date: string) => safeSetSelection("date", date),
    onSelectMovie: (movieId: string) => safeSetSelection("movie", movieId),
    onSelectCinema: (cinemaId: string) => safeSetSelection("cinema", cinemaId),
    clearAll: () => { setSelectedDate(""); setSelectedMovieId(""); setSelectedCinemaId(""); }
  };
};
