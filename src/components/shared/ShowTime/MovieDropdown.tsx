// src/components/shared/ShowTime/MovieDropdown.tsx
import React from "react";
interface MovieOpt { id: string; title: string; }

interface Props {
    options: MovieOpt[]; // {id, title}
    value?: string; // selected movieId
    onChange: (movieId: string) => void;
    label?: string;
}

const MovieDropdown: React.FC<Props> = ({ options, value, onChange, label = "2. Phim" }) => {
    return (
        <div className="flex-1 min-w-[220px] border border-gray-500 rounded-lg p-4 bg-[#0B0F19]">
            <div className="flex items-center justify-between mb-3 text-yellow-400 font-bold text-lg">
                <span>{label}</span>
                <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10h5v5H7z" opacity="0" /> </svg>
            </div>

            <select
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
                <option value="">-- Chọn phim --</option>
                {options.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MovieDropdown;
