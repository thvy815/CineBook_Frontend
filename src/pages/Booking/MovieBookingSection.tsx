import { useState } from "react";
import BookingPage from "./BookingPage";
import ShowtimeSelection from "./ShowtimeSelection";

interface Props {
  movieId: string;
  movieName: string;
}

export default function MovieBookingSection({ movieId, movieName }: Props) {
  const [selectedShowtime, setSelectedShowtime] = useState<{
    showtimeId: string,
    theaterId: string;
    theaterName: string;
    roomId: string;
    roomName: string;
    startTime: string;
  } | null>(null);

  return (
    <div>
      {/* 1. Lịch chiếu */}
      <ShowtimeSelection 
        movieId={movieId} 
        onSelectShowtime={setSelectedShowtime} 
      />

      {/* 2. Booking hiển thị khi đã chọn showtime */}
      {selectedShowtime && (
        <BookingPage selectedShowtime={selectedShowtime} movieName={movieName} />
      )}
    </div>
  );
}
