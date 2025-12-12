import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { ShowTimeItem } from "../../types/showtime";

import FNBSelection from "./F&BSelection";
import BookingSummaryCard from "../../components/shared/FnBItem/BookingSummaryCard";
import { fnbService } from "../../services/fnbitem/fnbService";

import TicketSelection from "./TicketSelection";
import SeatMapPage from "../../pages/Booking/SeatMapPage"

export default function BookingPage() {
  const location = useLocation();
  const showtime = (location.state as { showtime: ShowTimeItem })?.showtime;
  const roomId = showtime?.roomId;
  if (!showtime || !roomId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        ❌ Không có suất chiếu nào được chọn.
      </div>
    );
  }

  /** ----- STATE VÉ ----- */
  const [ticketQuantities, setTicketQuantities] = useState<{ [key: string]: number }>({});
  const totalSeatsNeeded = Object.values(ticketQuantities).reduce((a, b) => a + b, 0);

  /** ----- GHẾ ----- */
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  /** ----- F&B ----- */
  const [fnbQuantities, setFnbQuantities] = useState<{ [key: string]: number }>({});
  const [comboSummary, setComboSummary] = useState("");
  const [fnbTotal, setFnbTotal] = useState(0);

  /** ----- TÍNH TIỀN VÉ ----- */
  const [totalTicketPrice, setTotalTicketPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const currentUser = { id: "string" }; // sau lấy trong JWT

  // ---- F&B summary ----
  useEffect(() => {
    const combos = fnbService.getCombos();
    const drinks = fnbService.getDrinks();

    let total = 0;
    const summaryArr: string[] = [];

    [...combos, ...drinks].forEach((item) => {
      const qty = fnbQuantities[item.key] || 0;
      if (qty > 0) {
        total += qty * item.price;
        summaryArr.push(`${qty} x ${item.title}`);
      }
    });

    setFnbTotal(total);
    setComboSummary(summaryArr.join(" + "));
  }, [fnbQuantities]);

  // ---- Tính tiền vé ----
  useEffect(() => {
    const priceAdult = 90000;
    const priceChild = 70000;
    const priceStudent = 60000;

    const total =
      (ticketQuantities.adult || 0) * priceAdult +
      (ticketQuantities.child || 0) * priceChild +
      (ticketQuantities.student || 0) * priceStudent;

    setTotalTicketPrice(total);
  }, [ticketQuantities]);

  // ---- Tổng cộng ----
  useEffect(() => {
    setTotalPrice(totalTicketPrice + fnbTotal);
  }, [totalTicketPrice, fnbTotal]);

  // ----- Validate trước khi đặt -----
  const handleBook = () => {
    if (totalSeatsNeeded === 0) {
      alert("⚠️ Bạn chưa chọn vé!");
      return;
    }

    if (selectedSeats.length !== totalSeatsNeeded) {
      alert(`⚠️ Số ghế phải bằng số vé (${totalSeatsNeeded} vé / ${selectedSeats.length} ghế)`);
      return;
    }

    alert(`
      🎉 ĐẶT VÉ THÀNH CÔNG!
      🎬 Phim: ${showtime.movieTitle}
      🏢 Rạp: ${showtime.cinemaName}
      💺 Ghế: ${selectedSeats.join(", ")}
      💵 Tổng tiền: ${totalPrice.toLocaleString()} VND
    `);
  };

  return (
    <div className="min-h-screen text-white px-6 py-10">

      {/* --- CHỌN VÉ --- */}
      <div className="max-w-4xl mx-auto mb-14">
        <TicketSelection
          showtimeId={showtime.id}
          quantities={ticketQuantities}
          setQuantities={setTicketQuantities}
        />
      </div>

      {/* --- CHỌN GHẾ --- */}
      <div className="max-w-4xl mx-auto mb-14">
        <SeatMapPage
          showtimeId={showtime.id}
          roomId={roomId}
          userId={currentUser.id}
          remainingTickets={totalSeatsNeeded}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats} // truyền callback để BookingPage quản lý state
        />
      </div>

      {/* --- F&B --- */}
      <div className="max-w-4xl mx-auto mb-14">
        <FNBSelection
          showtime={showtime}
          quantities={fnbQuantities}
          onIncrease={(key) =>
            setFnbQuantities((q) => ({ ...q, [key]: (q[key] || 0) + 1 }))
          }
          onDecrease={(key) =>
            setFnbQuantities((q) => ({
              ...q,
              [key]: Math.max(0, (q[key] || 0) - 1),
            }))
          }
        />
      </div>

      {/* --- SUMMARY --- */}
      <div className="max-w-4xl mx-auto">
        <BookingSummaryCard
          movieTitle={showtime.movieTitle}
          cinemaName={showtime.cinemaName}
          comboSummary={comboSummary || "Không có F&B"}
          holdTime="05:00"
          totalPrice={totalPrice}
          onBook={handleBook}
        />
      </div>
    </div>
  );
}
