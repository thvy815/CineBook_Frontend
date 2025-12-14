interface Props {
    value: { adult: number; child: number; student: number };
    onChange: (v: Props["value"]) => void;
}

export default function TicketSelector({ value, onChange }: Props) {
    const update = (key: keyof Props["value"], delta: number) => {
        onChange({ ...value, [key]: Math.max(0, value[key] + delta) });
    };


    return (
        <section className="bg-black/40 rounded-xl p-6 text-white">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">🎟 Chọn vé</h3>

            {["adult", "child", "student"].map(k => (
                <div key={k} className="flex justify-between items-center py-2">
                    <span className="capitalize">{k}</span>
                    <div className="flex gap-3">
                        <button onClick={() => update(k as any, -1)} className="btn">-</button>
                        <span>{value[k as keyof Props["value"]]}</span>
                        <button onClick={() => update(k as any, 1)} className="btn">+</button>
                    </div>
                </div>
            ))}
        </section>
    );
}