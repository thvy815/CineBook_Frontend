import { useEffect, useState } from "react";

interface Props {
    totalTickets: number;
    seats: string[];
    combos: Record<string, number>;
}

export default function BookingBar({ totalTickets, seats }: Props) {
    const [time, setTime] = useState(300);

    useEffect(() => {
        const t = setInterval(() => setTime(t => Math.max(0, t - 1)), 1000);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black/90 border-t border-yellow-400 p-4 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-white text-sm">
                    <p>🎬 Phim: <span className="text-yellow-400">Movie Name</span></p>
                    <p>💺 Ghế: {seats.join(", ") || "Chưa chọn"}</p>
                </div>
                <div className="flex items-center gap-6">
                    <span className="text-yellow-400 font-bold">⏳ {Math.floor(time/60)}:{(time%60).toString().padStart(2,"0")}</span>
                    <button
                        disabled={totalTickets === 0 || seats.length !== totalTickets}
                        className="bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold disabled:opacity-40">
                        Đặt vé
                    </button>
                </div>
            </div>
        </div>
    );
}