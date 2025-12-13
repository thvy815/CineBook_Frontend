interface Props {
  selectedDate: string;
  onChange: (date: string) => void;
}

const getNext5Days = () => {
  return Array.from({ length: 5 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      value: d.toISOString().split("T")[0],
      label: d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        weekday: "long"
      })
    };
  });
};

export default function DateSelector({ selectedDate, onChange }: Props) {
  const days = getNext5Days();

  return (
    <div className="flex gap-3 justify-center mb-10">
      {days.map(d => (
        <button
          key={d.value}
          onClick={() => onChange(d.value)}
          className={`px-4 py-3 rounded-lg border text-center
            ${selectedDate === d.value
              ? "bg-yellow-400 text-black"
              : "border-yellow-400 text-yellow-400"}
          `}
        >
          <div className="font-bold">{d.value.slice(8, 10)}/{d.value.slice(5, 7)}</div>
          <div className="text-base capitalize">{d.label.split(",")[0]}</div>
        </button>
      ))}
    </div>
  );
}
