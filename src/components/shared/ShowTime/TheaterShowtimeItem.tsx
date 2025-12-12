import type { ShowtimeItem } from "../../../types/showtime";

interface Props {
    theaterName: string;
    address: string;
    items: ShowtimeItem[];
}

export const TheaterShowtimeItem = ({ theaterName, address, items }: Props) => {
    return (
        <div className="theater-block">
            <h2>{theaterName}</h2>
            <p className="address">{address}</p>

            {/* List giờ chiếu */}
            <div className="time-list">
                {items.map((it) => (
                    <button key={it.id} className="time-btn">
                        {it.startTime}
                    </button>
                ))}
            </div>
        </div>
    );
};
