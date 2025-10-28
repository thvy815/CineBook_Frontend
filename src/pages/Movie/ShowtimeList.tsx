// src/pages/Movie/ShowtimeList.tsx
import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import DateDropdown from "../../components/shared/ShowTime/DateDropdown";
import MovieDropdown from "../../components/shared/ShowTime/MovieDropdown";
import CinemaDropdown from "../../components/shared/ShowTime/CinemaDropdown";
import { useShowtimeSelector } from "../../hooks/ShowTime/useShowtimeSelector";
import MovieList from "../../components/shared/ShowTime/MovieList";
import { useNavigate } from "react-router-dom";
import type { ShowTimeItem } from "../../types/showtime";

const ShowtimeList: React.FC = () => {
  const {
    loading,
    selectedDate,
    selectedMovieId,
    selectedCinemaId,
    availableDates,
    availableMovies,
    availableCinemas,
    showtimesResult,
    onSelectDate,
    onSelectMovie,
    onSelectCinema,
  } = useShowtimeSelector();

  const navigate = useNavigate();
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string | null>(null);

  const handleSelectShowtime = (showtime: ShowTimeItem) => {
    setSelectedShowtimeId(showtime.id);
    navigate("/showtime", { state: { showtime } });
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-4">
          <DateDropdown options={availableDates} value={selectedDate} onChange={onSelectDate} />
          <MovieDropdown options={availableMovies} value={selectedMovieId} onChange={onSelectMovie} />
          <CinemaDropdown options={availableCinemas} value={selectedCinemaId} onChange={onSelectCinema} />
        </div>

        <div className="distance py-5"></div>

        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <MovieList
            showtimes={showtimesResult}
            onSelectShowtime={handleSelectShowtime}
            selectedShowtimeId={selectedShowtimeId}
          />
        )}
      </div>
    </Layout>
  );
};

export default ShowtimeList;
