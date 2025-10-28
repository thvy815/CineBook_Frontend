import React from "react";

interface DateCardProps {
  date: Date;
  selected?: boolean;
  onClick?: () => void;
}

export default function DateCard({ date, selected, onClick }: DateCardProps) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const weekday = date.toLocaleDateString("vi-VN", { weekday: "long" });

  return (
    <div
      onClick={onClick}
      className={`w-24 h-24 flex flex-col items-center justify-center rounded-xl border-2 cursor-pointer transition-all duration-200 
        ${
          selected
            ? "border-yellow-400 bg-yellow-400/10 text-yellow-300 shadow-md scale-105"
            : "border-gray-600 bg-[#1c1c2b] text-gray-200 hover:border-yellow-300 hover:bg-[#2a2a3d]"
        }`}
    >
      <span className="text-xl font-semibold">{`${day}/${month}`}</span>
      <span className="text-sm capitalize text-gray-400">{weekday}</span>
    </div>
  );
}
