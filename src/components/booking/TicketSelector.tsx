interface Props {
  value: { ADULT: number; CHILDREN: number; STUDENT: number };
  onChange: (v: Props["value"]) => void;
}

export default function TicketSelector({ value, onChange }: Props) {
  const update = (key: keyof Props["value"], delta: number) => {
    onChange({ ...value, [key]: Math.max(0, value[key] + delta) });
  };

  const labels: Record<keyof Props["value"], string> = {
    ADULT: "Người lớn",
    CHILDREN: "Trẻ em",
    STUDENT: "Học sinh, sinh viên",
  };

  return (
    <section className="rounded-2xl p-6 bg-gray-900 border border-yellow-500/20">
      <h3 className="text-center text-yellow-300 justify-center text-2xl font-bold mb-6 flex items-center gap-2">
        CHỌN LOẠI VÉ
      </h3>

      {/* 3 cột vé */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(labels) as (keyof Props["value"])[]).map((k) => {
          const active = value[k] > 0;

          return (
            <div
              key={k}
              className={`rounded-xl p-5 border transition
                ${active
                  ? "border-yellow-400 bg-black"
                  : "border-white/10 bg-black/40 hover:border-yellow-400/50"
                }`}
            >
              {/* Tên vé */}
              <p className="text-center text-white font-medium mb-4">
                {labels[k]}
              </p>

              {/* Counter */}
              <div className="flex items-center justify-center gap-5">
                <button
                  onClick={() => update(k, -1)}
                  className="w-9 h-9 rounded-md border border-yellow-400/40 text-yellow-400
                             hover:bg-yellow-400 hover:text-black transition"
                >
                  −
                </button>

                <span className="text-2xl font-semibold text-white min-w-[28px] text-center">
                  {value[k]}
                </span>

                <button
                  onClick={() => update(k, 1)}
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
    </section>
  );
}
