// src/types/seatLayoutConfig.ts
import type { Seat } from "./seat";

export async function fetchSeatLayout(): Promise<Seat[]> {
  const res = await fetch("/api/seats");  // URL API BE
  if (!res.ok) {
    throw new Error("Failed to fetch seat layout");
  }

  const data = await res.json();
  return data as Seat[];  // BE trả về danh sách ghế đúng cấu trúc Seat
}