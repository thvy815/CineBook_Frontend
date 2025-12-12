import { useEffect, useState, useCallback, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { seatService } from "../../services/showtime/seatService";

export type Seat = {
    id: string;
    seatNumber: string;
    rowLabel: string;
    columnIndex: number;
    type: string;
    status?: "available" | "locked" | "booked";
    owner?: string;
};

// convert status
const mapStatus = (status: string): Seat["status"] => {
    const s = status?.toLowerCase() || "";
    if (s === "locked") return "locked";
    if (s === "booked") return "booked";
    return "available";
};

export function useSeat(showtimeId: string, roomId: string, userId: string) {

    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    // ⭐ LƯU CONNECTION TẠI ĐÂY
    const connRef = useRef<signalR.HubConnection | null>(null);

    // ============================================
    // 1. FETCH SEATS
    // ============================================
    const fetchSeats = useCallback(async () => {
        try {
            const res = await seatService.getSeats(roomId);

            const mapped: Seat[] = res.data.map((s: any) => ({
                id: s.id,
                seatNumber: s.seatNumber,
                rowLabel: s.row ?? s.rowLabel,
                columnIndex: s.column ?? s.columnIndex,
                type: s.type,
                status: mapStatus(s.status),
                owner: s.owner ?? undefined
            }));

            setSeats(mapped);
        } catch (err) {
            console.error("Fetch seat error:", err);
        }
    }, [roomId]);

    // ============================================
    // 2. SIGNALR
    // ============================================
    useEffect(() => {
        fetchSeats();

        const conn = new signalR.HubConnectionBuilder()
            .withUrl(`http://localhost:5000/hubs/seat-lock?showtimeId=${showtimeId}`)
            .withAutomaticReconnect()
            .build();

        conn.start()
            .then(() => console.log("SignalR connected"))
            .catch(err => console.error("SignalR start error:", err));

        // 👉 LƯU CONNECTION
        connRef.current = conn;

        // Lắng nghe event duy nhất
        conn.on("SeatUpdated", msg => {
            setSeats(prev =>
                prev.map(s =>
                    s.seatNumber === msg.seat
                        ? {
                              ...s,
                              status: msg.locked ? "locked" : "available",
                              owner: msg.user
                          }
                        : s
                )
            );
        });

        return () => {
            conn.stop();
        };
    }, [showtimeId, fetchSeats]);

    // ============================================
    // 3. SELECT SEAT (LOCK / UNLOCK)
    // ============================================
    const selectSeat = async (seat: Seat) => {
        // ghế bị người khác lock
        if (seat.status === "locked" && seat.owner !== userId) {
            alert("Ghế này đã bị người khác giữ!");
            return;
        }

        const isSelected = selectedSeats.includes(seat.seatNumber);

        // BỎ CHỌN => UNLOCK
        if (isSelected) {
            await connRef.current?.invoke("ReleaseSeat", showtimeId, seat.seatNumber, userId);

            setSelectedSeats(prev => prev.filter(x => x !== seat.seatNumber));
            return;
        }

        // CHỌN => LOCK
        await connRef.current?.invoke("LockSeat", showtimeId, seat.seatNumber, userId);

        setSelectedSeats(prev => [...prev, seat.seatNumber]);
    };

    return {
        seats,
        selectedSeats,
        selectSeat
    };
}
