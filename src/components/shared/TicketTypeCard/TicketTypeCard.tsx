// src/components/shared/TicketTypeCard/TicketTypeCard.tsx
import React from "react";

interface Props {
  title: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function TicketTypeCard({
  title,
  price,
  quantity,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <div className="rounded-2xl p-5 shadow-md text-white w-64 border border-gray-700 bg-[rgba(255,255,255,0.05)]">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-yellow-300 font-semibold mt-1">
        {price.toLocaleString()} VND
      </p>

      <div className="flex items-center gap-3 mt-4">
        <button
          className="bg-gray-700 hover:bg-gray-600 px-3 rounded text-lg"
          onClick={onDecrease}
        >
          –
        </button>

        <span className="w-6 text-center">{quantity}</span>

        <button
          className="bg-gray-700 hover:bg-gray-600 px-3 rounded text-lg"
          onClick={onIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
}
