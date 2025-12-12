import React from "react";
import ComboCard from "../../components/shared/FnBItem/ComboCard";
import DrinkCard from "../../components/shared/FnBItem/DrinkCard";
import type { FnBItem } from "../../types/fnb_item";
import { fnbService } from "../../services/fnbitem/fnbService";
import type { ShowTimeItem } from "../../types/showtime";

type Props = {
  showtime: ShowTimeItem;
  quantities: { [key: string]: number };
  onIncrease: (key: string) => void;
  onDecrease: (key: string) => void;
};

export default function FNBSelection({
  showtime,
  quantities,
  onIncrease,
  onDecrease,
}: Props) {
  const combos: FnBItem[] = fnbService.getCombos();
  const drinks: FnBItem[] = fnbService.getDrinks();

  return (
    <div className="text-white">
      <h1 className="text-4xl font-extrabold mb-8 tracking-widest">
      CHỌN BẮP NƯỚC
      </h1>
      {/* --- COMBO SECTION --- */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-yellow-200">COMBO 2 NGĂN</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {combos.map((combo) => (
            <ComboCard
              key={combo.key}
              image={combo.image}
              title={combo.title}
              description={combo.description || ""}
              price={combo.price}
              quantity={quantities[combo.key] || 0}
              onIncrease={() => onIncrease(combo.key)}
              onDecrease={() => onDecrease(combo.key)}
            />
          ))}
        </div>
      </section>

      {/* --- DRINK SECTION --- */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4 text-yellow-200">NƯỚC NGỌT</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {drinks.map((drink) => (
            <DrinkCard
              key={drink.key}
              image={drink.image}
              title={drink.title}
              price={drink.price}
              quantity={quantities[drink.key] || 0}
              onIncrease={() => onIncrease(drink.key)}
              onDecrease={() => onDecrease(drink.key)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
