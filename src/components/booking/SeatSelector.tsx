interface SeatProps {
    maxSeats: number;
    selectedSeats: string[];
    onChange: (v: string[]) => void;
}

const SEATS = Array.from({ length: 40 }).map((_, i) => `A${i + 1}`);

export default function SeatSelector({ maxSeats, selectedSeats, onChange }: SeatProps) {
    const toggle = (seat: string) => {
        if (selectedSeats.includes(seat))
        onChange(selectedSeats.filter(s => s !== seat));
        else if (selectedSeats.length < maxSeats)
        onChange([...selectedSeats, seat]);
    };

    return (
        <section className="bg-black/40 rounded-xl p-6 mt-6 text-white">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">💺 Chọn ghế</h3>

            <div className="grid grid-cols-8 gap-2 justify-center">
                {SEATS.map(seat => (
                    <button
                        key={seat}
                        onClick={() => toggle(seat)}
                        className={`p-2 rounded text-sm font-semibold
                        ${selectedSeats.includes(seat)
                        ? "bg-yellow-400 text-black"
                        : "bg-white/10 hover:bg-yellow-400/30"}`} >
                        {seat}
                    </button>
                ))}
            </div>
            <p className="text-sm text-white/60 mt-2">Đã chọn {selectedSeats.length}/{maxSeats} ghế</p>
        </section>
    );
}