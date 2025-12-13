export interface ShowtimeItem {
  roomId: string;
  roomName: string;
  date: string;
  startTimeFormatted: string;
}

export interface TheaterShowtime {
  theaterId: string;
  theaterName: string;
  theaterAddress: string;
  showtimes: ShowtimeItem[];
}
