// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import type { ShowTimeItem } from "../../types/showtime";
// import FNBSelection from "./F&BSelection";
// import BookingSummaryCard from "../../components/shared/FnBItem/BookingSummaryCard";
// import { fnbService } from "../../services/fnbitem/fnbService";
// import ShowtimePage from "../Showtime/ShowtimePage";

// export default function BookingPage() {
//   const location = useLocation();
//   const showtime = (location.state as { showtime: ShowTimeItem })?.showtime;

//   if (!showtime) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-300">
//         ❌ Không có suất chiếu nào được chọn.
//       </div>
//     );
//   }

//   // --- State chung ---
//   const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
//   const [comboSummary, setComboSummary] = useState("");
//   const [fnbTotal, setFnbTotal] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(showtime.price);

//   // --- Handler tăng/giảm F&B ---
//   const handleIncrease = (key: string) =>
//     setQuantities((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));

//   const handleDecrease = (key: string) =>
//     setQuantities((prev) => ({ ...prev, [key]: Math.max((prev[key] || 0) - 1, 0) }));

//   // --- Tính tổng tiền và comboSummary realtime ---
//   useEffect(() => {
//     const combos = fnbService.getCombos();
//     const drinks = fnbService.getDrinks();

//     let total = 0;
//     const summaryArr: string[] = [];

//     [...combos, ...drinks].forEach((item) => {
//       const qty = quantities[item.key] || 0;
//       if (qty > 0) {
//         total += qty * item.price;
//         summaryArr.push(`${qty} ${item.title}`);
//       }
//     });

//     setFnbTotal(total);
//     setComboSummary(summaryArr.join(" + "));
//     setTotalPrice(showtime.price + total);
//   }, [quantities, showtime]);

//   // --- Khi nhấn "ĐẶT VÉ" ---
//   const handleBook = () => {
//     alert(`🎟️ Đặt vé thành công!\nTổng tiền: ${totalPrice.toLocaleString()} VND`);
//   };

//   return (
//     <div className="min-h-screen text-white px-6 py-10">
//       {/* --- THÔNG TIN SUẤT CHIẾU --- */}
//       <div className="max-w-4xl mx-auto rounded-xl p-6 shadow-lg mb-8">
//         <ShowtimePage showtime={showtime} />
//       </div>

//       {/* --- F&B SELECTION --- */}
//       <div className="max-w-4xl mx-auto mb-6">
//         <FNBSelection
//           showtime={showtime}
//           quantities={quantities}
//           onIncrease={handleIncrease}
//           onDecrease={handleDecrease}
//         />
//       </div>

//       {/* --- BOOKING SUMMARY --- */}
//       <div className="max-w-4xl mx-auto">
//         <BookingSummaryCard
//           movieTitle={showtime.movieTitle}
//           cinemaName={showtime.cinemaName}
//           comboSummary={comboSummary || "Không có F&B"}
//           holdTime="05:00"
//           totalPrice={totalPrice}
//           onBook={handleBook}
//         />
//       </div>
//     </div>
//   );
// }
