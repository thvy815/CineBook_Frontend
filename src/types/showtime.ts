// src/types/showtime.ts
export interface ShowTimeItem {
    id: string;
    movieId: string;
    movieTitle: string;
    cinemaId: string;
    cinemaName: string;
    date: string; 
    time: string; 
    price: number;
    posterUrl?: string; 
    genre: string;
    duration: string;
    province: string;
}