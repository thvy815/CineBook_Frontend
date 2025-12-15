import type { TheaterShowtime } from "../../types/showtime";

interface TheaterShowtimesProps {
  data: TheaterShowtime[];
  onSelectShowtime: (showtime: {
    showtimeId: string;
    theaterId: string;
    theaterName: string;
    roomId: string;
    roomName: string;
    startTime: string;
  }) => void;
}

export default function TheaterShowtimes({ data, onSelectShowtime }: TheaterShowtimesProps) {
  if (!data.length) {
    return (
      <p className="text-center text-gray-400 mt-10">
        Không có suất chiếu cho ngày này
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {data.map(theater => (
        <div
          key={theater.theaterId}
          className="border border-yellow-400 bg-yellow-300/10 rounded-xl p-5"
        >
          <h3 className="text-yellow-400 font-bold text-2xl mb-1">
            {theater.theaterName}
          </h3>

          <p className="text-white text-base mb-4">
            {theater.theaterAddress}
          </p>

          <div className="flex flex-wrap gap-3">
            {theater.showtimes.map((s, idx) => (
              <button
                key={`${s.roomId}-${idx}`}
                className="border border-white px-4 py-2 rounded-lg 
                           text-white text-lg
                           hover:bg-yellow-400 hover:text-black
                           transition"
                 onClick={() => onSelectShowtime({
                  showtimeId: s.showtimeId,
                  theaterId: theater.theaterId,
                  theaterName: theater.theaterName,
                  roomId: s.roomId,
                  roomName: s.roomName,
                  startTime: s.startTimeFormatted,
                })}
              >
                {s.startTimeFormatted}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
