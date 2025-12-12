export interface ShowtimeItem {
    id: string;
    movieId: string;
    movieTitle: string;
    theaterId: string;
    theaterName: string;
    theaterAddress: string;
    roomId: string;
    date: string;        // yyyy-MM-dd
    startTime: string;   // "08:30"
    format: string;      // STANDARD / 2D / 3D...
    posterUrl: string;
}

export interface CreateShowtimeDto {
  movieTitle: string;
  startDate: string;
  startTime: string;
  endTime: string;
  theaterName: string;
  roomName: string;
  price: number;
}
