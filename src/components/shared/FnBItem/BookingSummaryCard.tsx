import React, { useState } from "react";

interface BookingSummaryCardProps {
  movieTitle: string;
  cinemaName: string;
  comboSummary: string;
  holdTime: string;
  totalPrice: number;
  onBook: () => void;
}
export default function BookingSummaryCard({
  movieTitle,
  cinemaName,
  comboSummary,
  holdTime,
  totalPrice,
  onBook,
}: BookingSummaryCardProps) {
  return (
    <div className="w-full text-white rounded-lg flex justify-between items-center p-4 mt-6 shadow-md  bg-[#1e1e2e]">
      <div>
        <h3 className="font-bold text-sm">{movieTitle}</h3>
        <p className="text-sm text-gray-300">{cinemaName}</p>
        <p className="text-sm text-gray-400">{comboSummary}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-yellow-400 text-black rounded-md p-2 text-center font-semibold">
          <p className="text-xs">Thời gian giữ vé</p>
          <p className="text-lg font-bold">{holdTime}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-300">Tạm tính</p>
          <p className="text-lg font-bold">{totalPrice.toLocaleString()} VND</p>
        </div>

        <button
          onClick={onBook}
          className="bg-yellow-700 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          ĐẶT VÉ
        </button>
      </div>
    </div>
  );
}
