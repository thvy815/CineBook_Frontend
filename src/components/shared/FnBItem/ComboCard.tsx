import React from "react";

interface ComboCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const ComboCard: React.FC<ComboCardProps> = ({
  image,
  title,
  description,
  price,
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="rounded-2xl p-4 shadow-md text-white w-64 flex flex-col items-center gap-3 border-gray-700 center">
      <img src={image} alt={title} className="h-32 object-contain" />
      <h3 className="font-bold text-lg text-center">{title}</h3>
      <p className="text-sm text-gray-400 text-center">{description}</p>
      <p className="text-yellow-300 font-semibold">{price.toLocaleString()} VND</p>
      <div className="flex items-center gap-2 mt-2">
        <button
          className="bg-gray-700 hover:bg-gray-600 px-2 rounded text-lg"
          onClick={onDecrease}
        >
          –
        </button>
        <span className="w-6 text-center">{quantity}</span>
        <button
          className="bg-gray-700 hover:bg-gray-600 px-2 rounded text-lg"
          onClick={onIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ComboCard;
