import { useState, useEffect, useMemo } from "react";
import TicketSelector from "../../components/booking/TicketSelector";
import SeatSelector from "../../components/booking/SeatSelector";
import ComboSelector from "../../components/booking/ComboSelector";
import BookingBar from "../../components/booking/BookingBar";
import type { Seat, SeatPrice } from "../../types/showtime";
import { showtimeSeatService } from "../../services/showtime/showtimeSeatService";
import { seatPriceService } from "../../services/pricing/seatPriceService";
import type { BookingDraft, FnbDraft, SeatTicketDraft } from "../../types/bookingDraft";
import type { FnbItem } from "../../types/fnbItem";
import { fnbService } from "../../services/pricing/fnbService";
import { bookingService } from "../../services/booking/bookingService";
import { useNavigate } from "react-router-dom";

interface BookingPageProps {
  selectedShowtime: {
    showtimeId: string;
    theaterId: string;
    theaterName: string;
    roomId: string;
    roomName: string;
    startTime: string;
  };
  movieName: string;
}

export default function BookingPage({ selectedShowtime, movieName }: BookingPageProps) {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState({ ADULT: 0, CHILDREN: 0, STUDENT: 0 });
    const totalTickets = tickets.ADULT + tickets.CHILDREN + tickets.STUDENT;

    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [fnbItems, setFnbItems] = useState<FnbItem[]>([]);
    const [combos, setCombos] = useState<Record<string, number>>({});

    const [seats, setSeats] = useState<Seat[]>([]);
    const [seatPrices, setSeatPrices] = useState<SeatPrice[]>([]);
    
    const [loadingSeats, setLoadingSeats] = useState(false);

    /* ================= LOAD DATA ================= */
    useEffect(() => {
        async function loadSeats() {
            setLoadingSeats(true);
            try {
                const [seatData, priceData, fnbData] = await Promise.all([
                showtimeSeatService.getByShowtimeId(selectedShowtime.showtimeId),
                seatPriceService.getSeatPrices(),
                fnbService.getAll(),
                ]);
                setSeats(seatData);
                setSeatPrices(priceData);
                setFnbItems(fnbData);
            } catch (err) {
                console.error("Load booking data failed", err);
            } finally {
                setLoadingSeats(false);
            }
        }

        if (selectedShowtime.showtimeId) {
            loadSeats();
        }
    }, [selectedShowtime.showtimeId]);

    /* ================= HELPER ================= */
    const priceMap = useMemo(() => {
        const map = new Map<string, number>();
        seatPrices.forEach(p => {
        map.set(`${p.seatType}-${p.ticketType}`, p.basePrice);
        });
        console.log("💰 priceMap:", map); 
        return map;
    }, [seatPrices]);

    function buildSeatDraft(): SeatTicketDraft[] {
        const seatObjects = selectedSeats
            .map(sn => seats.find(s => s.seatNumber === sn))
            .filter(Boolean) as Seat[];

        const result: SeatTicketDraft[] = [];
        let index = 0;

        (Object.entries(tickets) as [string, number][]).forEach(
        ([ticketType, qty]) => {
            for (let i = 0; i < qty; i++) {
            const seat = seatObjects[index];
            if (!seat) return;

            const price =
                seat.seatType === "DOUBLE"
                    ? priceMap.get(`DOUBLE-ADULT`) || 0   // luôn lấy DOUBLE-ADULT
                    : priceMap.get(`${seat.seatType}-${ticketType}`) || 0;

            result.push({
                showtimeSeatId: seat.id,
                seatNumber: seat.seatNumber,
                seatType: seat.seatType,
                ticketType,
                price,
            });

            index++;
            }
        }
        );

        return result;
    }

    /* ================= BOOKING DRAFT ================= */
    const seatDraft = useMemo(buildSeatDraft, [
        selectedSeats,
        tickets,
        seats,
        priceMap,
    ]);

    const seatTotal = seatDraft.reduce(
        (sum, s) => sum + s.price,
        0
    );

    const fnbDraft: FnbDraft[] = useMemo(() => {
    return Object.entries(combos)
        .filter(([, qty]) => qty > 0)
        .map(([fnbItemId, quantity]) => {
        const item = fnbItems.find(f => f.id === fnbItemId);
        if (!item) return null;

        return {
            fnbItemId,
            name: item.name,
            quantity,
            unitPrice: item.unitPrice,
        };
        })
        .filter(Boolean) as FnbDraft[];
    }, [combos, fnbItems]);

    const fnbTotal = useMemo(
    () =>
        fnbDraft.reduce(
        (sum, f) => sum + f.quantity * f.unitPrice,
        0
        ),
    [fnbDraft]
    );

    const totalPrice = seatTotal + fnbTotal;

    const bookingDraft: BookingDraft = {
        showtimeId: selectedShowtime.showtimeId,
        seats: seatDraft,
        fnBs: fnbDraft,
        totalPrice,
    };

    /* ================= SUBMIT ================= */
    async function submitBooking() {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("Vui lòng đăng nhập để tiếp tục đặt vé");
            navigate("/login");
            return;
        }

        const payload = {
            userId: userId, 
            showtimeId: bookingDraft.showtimeId,

            seats: bookingDraft.seats.map(s => ({
                showtimeSeatId: s.showtimeSeatId,
                seatType: s.seatType,
                ticketType: s.ticketType,
                quantity: 1,
                price: s.price,
            })),
            fnBs: bookingDraft.fnBs.map(f => ({
                fnbItemId: f.fnbItemId,
                quantity: f.quantity,
            })),
            promotionCode: null,
        };

        console.log("🚀 POST pending booking:", payload);

        try {
            const result = await bookingService.createBooking(payload);
            console.log("✅ Booking pending created:", result);
        } catch (err) {
            console.error("❌ Create booking failed:", err);
            alert("Đặt vé thất bại, vui lòng thử lại");
        }
    }

    return (
        <div className="relative pb-40 mt-10 p-8 rounded-2xl bg-gradient-to-b from-black via-gray-900 to-black border border-yellow-500/40 shadow-2xl">
            <h2 className="text-white text-2xl font-bold mb-6">
                Đặt vé: {selectedShowtime.theaterName} - Suất {selectedShowtime.startTime}
            </h2>
            <TicketSelector value={tickets} onChange={setTickets} />

            {loadingSeats ? (
                <p className="text-white text-center mt-6">
                Đang tải sơ đồ ghế...
                </p>
            ) : (
            <SeatSelector
                roomName={selectedShowtime.roomName}
                seats={seats} 
                maxSeats={totalTickets}
                selectedSeats={selectedSeats}
                onChange={setSelectedSeats} />
            )}

            <ComboSelector value={combos} onChange={setCombos} />

            <BookingBar
                movieName={movieName} 
                theaterName={selectedShowtime.theaterName}
                roomName={selectedShowtime.roomName}
                startTime={selectedShowtime.startTime}

                seats={seatDraft}
                fnBs={fnbDraft} 

                totalPrice={bookingDraft.totalPrice}
                canSubmit={
                    totalTickets > 0 &&
                    seatDraft.reduce((sum, s) => sum + (s.seatType === "DOUBLE" ? 2 : 1), 0) === totalTickets
                }
                onSubmit={submitBooking}
            />
        </div>
    );
}