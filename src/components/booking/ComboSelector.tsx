const COMBOS = [
    { id: "combo1", name: "Bắp + Nước", price: 60000 },
    { id: "combo2", name: "Bắp lớn + 2 Nước", price: 90000 }
];

interface ComboProps {
    value: Record<string, number>;
    onChange: (v: Record<string, number>) => void;
}

export default function ComboSelector({ value, onChange }: ComboProps) {
    const update = (id: string, delta: number) => {
    onChange({ ...value, [id]: Math.max(0, (value[id] || 0) + delta) });
    };


    return (
        <section className="bg-black/40 rounded-xl p-6 mt-6 text-white">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">🍿 Bắp nước</h3>

            {COMBOS.map(c => (
                <div key={c.id} className="flex justify-between items-center py-2">
                    <div>
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-sm text-white/60">{c.price.toLocaleString()}đ</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => update(c.id, -1)} className="btn">-</button>
                        <span>{value[c.id] || 0}</span>
                        <button onClick={() => update(c.id, 1)} className="btn">+</button>
                    </div>
                </div>
            ))}
        </section>
    );
}