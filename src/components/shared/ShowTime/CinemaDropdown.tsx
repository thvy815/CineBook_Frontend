// src/components/shared/ShowTime/CinemaDropdown.tsx
import React from "react";
interface CinemaOpt { id: string; name: string; }

interface Props {
    options: CinemaOpt[];
    value?: string;
    onChange: (cinemaId: string) => void;
    label?: string;
}

const CinemaDropdown: React.FC<Props> = ({ options, value, onChange, label = "3. Rạp" }) => {
    return (
        <div className="flex-1 min-w-[220px] border border-gray-500 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3 text-yellow-400 font-bold text-lg">
                <span>{label}</span>
                <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10h5v5H7z" opacity="0" /> </svg>
            </div>

            <select
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
                <option value="">-- Chọn rạp --</option>
                {options.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CinemaDropdown;
