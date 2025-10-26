// src/pages/Movie/components/CinemaCard.tsx
import TimeGroup from "./TimeGroup";

interface Showtime {
    id: string;
    time: string;
    price: number;
}

interface Cinema {
    id: string;
    name: string;
    address: string;
    logoUrl: string;
    showtimes: Showtime[];
}

interface CinemaCardProps {
    cinema: Cinema;
    onSelectTime?: (showtime: Showtime) => void;
}

const CinemaCard = ({ cinema, onSelectTime }: CinemaCardProps) => {
    return (
        <div className="border p-4 rounded-lg flex gap-4 mb-6">
            <img
                src={cinema.logoUrl}
                alt={cinema.name}
                className="w-20 h-20 rounded object-contain"
            />
            <div className="flex-1">
                <h3 className="text-lg font-bold">{cinema.name}</h3>
                <p className="text-gray-500 text-sm">{cinema.address}</p>

                <div className="mt-4">
                    <TimeGroup
                        times={cinema.showtimes}
                        onSelect={(t) => onSelectTime?.(t)}
                    />
                </div>
            </div>
        </div>
    );
};

export default CinemaCard;
