// src/types/ticket_type.ts
export interface TicketType {
  id: string;
  name: string;
  price: number;
  type: string; // "single" | "double"
}
