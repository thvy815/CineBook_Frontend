// src/hooks/useShowtimeSelector.ts
import { useEffect, useState } from "react";
import type { ShowTimeItem } from "../../types/showtime";
import { getAllShowtimes, getDistinctDates, getDistinctMovies, getDistinctCinemas, filterShowtimes } from "../../services/showtime/showtimeService";

export const useShowtimeSelector = () => {
    const [all, setAll] = useState<ShowTimeItem[]>([]);
    const [loading, setLoading] = useState(true);

    // selected (can choose any order)
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

    // compute available options based on current selections.
    // rule: choose any order — available options = distinct values among items that satisfy current other selections
    const availableItems = filterShowtimes(all, {
        date: selectedDate || undefined,
        movieId: selectedMovieId || undefined,
        cinemaId: selectedCinemaId || undefined,
    });

    // For independent selection, when user selects X, we should present options consistent with X alone + already selected others.
    // availableDates given current selectedMovieId and selectedCinemaId (i.e. items matching those)
    const availableDates = getDistinctDates(filterShowtimes(all, { movieId: selectedMovieId || undefined, cinemaId: selectedCinemaId || undefined }));
    const availableMovies = getDistinctMovies(filterShowtimes(all, { date: selectedDate || undefined, cinemaId: selectedCinemaId || undefined }));
    const availableCinemas = getDistinctCinemas(filterShowtimes(all, { date: selectedDate || undefined, movieId: selectedMovieId || undefined }));

    // showtimes result when all three selected (or any combination you want)
    const showtimesResult = filterShowtimes(all, { date: selectedDate || undefined, movieId: selectedMovieId || undefined, cinemaId: selectedCinemaId || undefined });

    // helper to reset dependent selections when something changed
    const onSelectDate = (date: string) => {
        setSelectedDate(date);
        // optionally clear movie or cinema if they become invalid
        if (selectedMovieId) {
            const ok = filterShowtimes(all, { date, movieId: selectedMovieId }).length > 0;
            if (!ok) setSelectedMovieId("");
        }
        if (selectedCinemaId) {
            const ok = filterShowtimes(all, { date, cinemaId: selectedCinemaId }).length > 0;
            if (!ok) setSelectedCinemaId("");
        }
    };

    const onSelectMovie = (movieId: string) => {
        setSelectedMovieId(movieId);
        if (selectedDate) {
            const ok = filterShowtimes(all, { date: selectedDate, movieId }).length > 0;
            if (!ok) setSelectedDate("");
        }
        if (selectedCinemaId) {
            const ok = filterShowtimes(all, { movieId, cinemaId: selectedCinemaId }).length > 0;
            if (!ok) setSelectedCinemaId("");
        }
    };

    const onSelectCinema = (cinemaId: string) => {
        setSelectedCinemaId(cinemaId);
        if (selectedDate) {
            const ok = filterShowtimes(all, { date: selectedDate, cinemaId }).length > 0;
            if (!ok) setSelectedDate("");
        }
        if (selectedMovieId) {
            const ok = filterShowtimes(all, { movieId: selectedMovieId, cinemaId }).length > 0;
            if (!ok) setSelectedMovieId("");
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
        showtimesResult,
        onSelectDate,
        onSelectMovie,
        onSelectCinema,
        // helpers to clear
        clearAll: () => { setSelectedDate(""); setSelectedMovieId(""); setSelectedCinemaId(""); },
    };
};
