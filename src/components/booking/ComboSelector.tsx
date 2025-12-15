import { useEffect, useState } from "react";
import type { FnbItem } from "../../types/fnbItem";
import { fnbService } from "../../services/pricing/fnbService";

interface ComboProps {
  value: Record<string, number>;
  onChange: (v: Record<string, number>) => void;
}

export default function ComboSelector({ value, onChange }: ComboProps) {
  const [combos, setCombos] = useState<FnbItem[]>([]);
  const [loading, setLoading] = useState(true);

  const update = (id: string, delta: number) => {
    onChange({
      ...value,
      [id]: Math.max(0, (value[id] || 0) + delta),
    });
  };

  useEffect(() => {
    async function loadCombos() {
      try {
        const data = await fnbService.getAll();
        setCombos(data);
      } finally {
        setLoading(false);
      }
    }
    loadCombos();
  }, []);

  return (
    <section className="rounded-2xl p-6 bg-gray-900 border border-yellow-500/20 mt-6">
      <h3 className="text-center text-yellow-300 text-2xl font-bold mb-6">
        CHỌN BẮP NƯỚC
      </h3>

      {loading && (
        <p className="text-center text-white/60">Đang tải combo...</p>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {combos.map((c) => {
            const active = (value[c.id] || 0) > 0;

            return (
              <div
                key={c.id}
                className={`rounded-xl p-5 border transition-all duration-200
                  ${
                    active
                      ? "border-yellow-400 bg-black shadow-[0_0_0_1px_rgba(250,204,21,0.4)]"
                      : "border-white/10 bg-black/40 hover:border-yellow-400/40"
                  }
                `}
              >
                {/* Ảnh combo */}
                {c.url && (
                  <img
                    src={c.url}
                    alt={c.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}

                {/* Tên + mô tả */}
                <p className="text-white font-semibold text-center">
                  {c.name}
                </p>
                <p className="text-sm text-white/60 text-center mt-1">
                  {c.description}
                </p>

                <p className="text-yellow-400 font-semibold text-center mt-2">
                  {c.unitPrice.toLocaleString()}đ
                </p>

                {/* Counter */}
                <div className="flex items-center justify-center gap-6 mt-4">
                  <button
                    onClick={() => update(c.id, -1)}
                    className="w-9 h-9 rounded-md border border-yellow-400/40 text-yellow-400
                               hover:bg-yellow-400 hover:text-black transition"
                  >
                    −
                  </button>

                  <span className="text-2xl font-semibold text-white min-w-[28px] text-center">
                    {value[c.id] || 0}
                  </span>

                  <button
                    onClick={() => update(c.id, 1)}
                    className="w-9 h-9 rounded-md border border-yellow-400/40 text-yellow-400
                               hover:bg-yellow-400 hover:text-black transition"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
