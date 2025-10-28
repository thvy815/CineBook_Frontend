// src/components/shared/ShowTime/MovieList.tsx
import React from "react";
import MovieCard from "./MovieCard";
import type { ShowTimeItem } from "../../../types/showtime";

interface Props {
  showtimes: ShowTimeItem[];
  onSelectShowtime: (showtime: ShowTimeItem) => void;
  selectedShowtimeId?: string | null;
}

const MovieList: React.FC<Props> = ({ showtimes, onSelectShowtime, selectedShowtimeId }) => {
  const moviesMap = new Map<string, ShowTimeItem[]>();
  showtimes.forEach((s) => {
    if (!moviesMap.has(s.movieId)) {
      moviesMap.set(s.movieId, []);
    }
    moviesMap.get(s.movieId)!.push(s);
  });

  return (
    <div className="flex flex-col gap-6">
      {Array.from(moviesMap.entries()).map(([movieId, movieShowtimes]) => (
        <MovieCard
          key={movieId}
          movie={movieShowtimes[0]}
          showtimes={movieShowtimes}
          onSelectShowtime={onSelectShowtime}
          selectedShowtimeId={selectedShowtimeId}
        />
      ))}
    </div>
  );
};

export default MovieList;
