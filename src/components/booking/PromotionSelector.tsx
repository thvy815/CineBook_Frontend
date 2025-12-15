import { useState, useEffect } from "react";
import { promotionService, type Promotion } from "../../services/promotion/promotionServices";

interface Props {
  value: string | null; // promotion code hiện tại
  onChange: (v: string | null) => void;
}

export default function PromotionSelector({ value, onChange }: Props) {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    async function loadPromotions() {
      try {
        const data = await promotionService.getAll();
        setPromotions(data.filter(p => p.isActive));
      } catch (err) {
        console.error("Load promotions failed", err);
      }
    }
    loadPromotions();
  }, []);

  return (
    <section className="rounded-2xl p-6 bg-gray-900 border border-yellow-500/20 mt-6">
      <h3 className="text-center text-yellow-300 justify-center text-2xl font-bold mb-6 flex items-center gap-2">
        CHỌN MÃ KHUYẾN MÃI
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {promotions.map((p) => {
          const active = value === p.code;

          return (
            <div
              key={p.id}
              className={`rounded-xl p-5 border transition cursor-pointer
                ${active
                  ? "border-yellow-400 bg-black"
                  : "border-white/10 bg-black/40 hover:border-yellow-400/50"
                }`}
              onClick={() => onChange(p.code)}
            >
              <p className="text-center text-white font-medium mb-2">{p.code}</p>
              <p className="text-center text-yellow-400 font-semibold">
                {p.discountType === "PERCENT" ? `${p.discountValue}%` : `${p.discountValue}đ`}
              </p>
            </div>
          );
        })}
      </div>

      {/* Input thủ công */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Nhập mã khuyến mãi"
          className="p-2 rounded w-full bg-gray-800 text-white border border-white/20"
          value={value || ""}
          onChange={e => onChange(e.target.value || null)}
        />
      </div>
    </section>
  );
}
