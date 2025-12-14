import { useState } from "react";
import TicketSelector from "../../components/booking/TicketSelector";
import SeatSelector from "../../components/booking/SeatSelector";
import ComboSelector from "../../components/booking/ComboSelector";
import BookingBar from "../../components/booking/BookingBar";


export default function BookingPage() {
    const [tickets, setTickets] = useState({ adult: 0, child: 0, student: 0 });
    const totalTickets = tickets.adult + tickets.child + tickets.student;


    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [combos, setCombos] = useState<Record<string, number>>({});


    return (
        <div className="relative pb-40">
        <TicketSelector value={tickets} onChange={setTickets} />

        <SeatSelector
            maxSeats={totalTickets}
            selectedSeats={selectedSeats}
            onChange={setSelectedSeats} />

        <ComboSelector value={combos} onChange={setCombos} />

        <BookingBar
            totalTickets={totalTickets}
            seats={selectedSeats}
            combos={combos} />
        </div>
    );
}