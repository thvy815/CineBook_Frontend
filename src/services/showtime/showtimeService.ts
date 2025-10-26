// src/services/showtimeService.ts
import type { ShowTimeItem } from "../../types/showtime";

const MOCK: ShowTimeItem[] = [
    { id: "1", movieId: "m1", movieTitle: "Avengers", cinemaId: "c1", cinemaName: "CGV Vincom", date: "2025-01-01", time: "08:50", price: 90000 },
    { id: "2", movieId: "m1", movieTitle: "Avengers", cinemaId: "c2", cinemaName: "Galaxy Nguyễn Du", date: "2025-01-01", time: "11:10", price: 90000 },
    { id: "3", movieId: "m2", movieTitle: "Spider-Man", cinemaId: "c1", cinemaName: "CGV Vincom", date: "2025-01-01", time: "09:40", price: 85000 },
    { id: "4", movieId: "m2", movieTitle: "Spider-Man", cinemaId: "c3", cinemaName: "BHD Bitexco", date: "2025-01-02", time: "16:20", price: 95000 },
    { id: "5", movieId: "m3", movieTitle: "Batman", cinemaId: "c2", cinemaName: "Galaxy Nguyễn Du", date: "2025-01-02", time: "14:20", price: 80000 },
    { id: "6", movieId: "m1", movieTitle: "Avengers", cinemaId: "c1", cinemaName: "CGV Vincom", date: "2025-01-02", time: "13:30", price: 90000 },
    // add more rows as needed
];

// trả về arrays cho dropdown dựa trên filter hiện có
export const getAllShowtimes = async (): Promise<ShowTimeItem[]> => {
    // giả lập call async
    return new Promise((res) => setTimeout(() => res(MOCK), 150));
};

export const getDistinctDates = (items: ShowTimeItem[]) => {
    const s = new Set(items.map((i) => i.date));
    return Array.from(s).sort();
};

export const getDistinctMovies = (items: ShowTimeItem[]) => {
    const map = new Map<string, string>();
    items.forEach((i) => map.set(i.movieId, i.movieTitle));
    return Array.from(map.entries()).map(([id, title]) => ({ id, title }));
};

export const getDistinctCinemas = (items: ShowTimeItem[]) => {
    const map = new Map<string, string>();
    items.forEach((i) => map.set(i.cinemaId, i.cinemaName));
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
};

// filter items by optional criteria
export const filterShowtimes = (items: ShowTimeItem[], opts: { date?: string; movieId?: string; cinemaId?: string }) => {
    return items.filter((it) => {
        if (opts.date && it.date !== opts.date) return false;
        if (opts.movieId && it.movieId !== opts.movieId) return false;
        if (opts.cinemaId && it.cinemaId !== opts.cinemaId) return false;
        return true;
    });
};
