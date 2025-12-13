import type { Province } from "../../types/province";

interface Props {
  provinces: Province[];
  value?: string;
  onChange: (id: string) => void;
}

export default function ProvinceSelector({ provinces, value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="bg-white/10 backdrop-blur-md text-yellow-400 border border-yellow-400/70 px-4 py-2 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-yellow-400
              hover:border-white/20
                transition">
      {provinces.map(p => (
        <option key={p.id} value={p.id} className="bg-[#111] text-white">
          {p.name}
        </option>
      ))}
    </select>
  );
}
