// src/types/showtime.ts
export interface ShowTimeItem {
    id: string;
    movieId: string;
    movieTitle: string;
    cinemaId: string;
    cinemaName: string;
    date: string; // ISO yyyy-mm-dd
    time: string; // "14:30"
    price: number;
}
