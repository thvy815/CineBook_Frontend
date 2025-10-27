// src/services/fnbService.ts
import type { FnBItem } from "../../types/fnb_item";

export const fnbService = {
  getCombos(): FnBItem[] {
    return [
      {
        key: "combo_gau",
        title: "COMBO GẤU",
        description: "1 Coke 32oz + 1 Bắp 2 Ngăn 64oz Phô Mai + Caramel",
        price: 119000,
        image: "src/assets/images/ShowTime/poster.jpg",
      },
      {
        key: "combo_co_gau",
        title: "COMBO CÔ GẤU",
        description: "2 Coke 32oz + 1 Bắp 2 Ngăn 64oz Phô Mai + Caramel",
        price: 129000,
        image: "src/assets/images/ShowTime/poster.jpg",
      },
      {
        key: "combo_nha_gau",
        title: "COMBO NHÀ GẤU",
        description: "4 Coke 22oz + 2 Bắp 2 Ngăn 64oz Phô Mai + Caramel",
        price: 259000,
        image: "src/assets/images/ShowTime/poster.jpg",
      },
    ];
  },

  getDrinks(): FnBItem[] {
    return [
      { key: "sprite", title: "SPRITE 32OZ", price: 37000, image: "src/assets/images/ShowTime/poster.jpg" },
      { key: "fanta", title: "FANTA 32OZ", price: 37000, image: "src/assets/images/ShowTime/poster.jpg" },
      { key: "coke_zero", title: "COKE ZERO 32OZ", price: 37000, image: "src/assets/images/ShowTime/poster.jpg" },
      { key: "coke", title: "COKE 32OZ", price: 37000, image: "src/assets/images/ShowTime/poster.jpg" },
    ];
  },
};
