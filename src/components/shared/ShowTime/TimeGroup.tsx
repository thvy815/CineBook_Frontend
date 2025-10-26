// src/pages/Movie/components/TimeGroup.tsx
interface Time {
    id: string;
    time: string; // "14:30"
    price: number; // 60000
}

interface TimeGroupProps {
    times: Time[];
    onSelect?: (time: Time) => void; // optional nếu cần click chọn vé
}

const TimeGroup = ({ times, onSelect }: TimeGroupProps) => {
    return (
        <div className="flex flex-wrap gap-3">
            {times.map((t) => (
                <button
                    key={t.id}
                    className="border px-4 py-2 rounded hover:bg-gray-100"
                    onClick={() => onSelect?.(t)}
                >
                    {t.time} - {t.price.toLocaleString()}đ
                </button>
            ))}
        </div>
    );
};

export default TimeGroup;
