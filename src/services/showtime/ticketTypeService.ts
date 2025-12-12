// src/services/showtime/ticketTypeService.ts
import { API_BASE_URL } from "../../utils/constants";
import type { TicketType } from "../../types/ticket_type";

export const ticketTypeService = {
  async getByShowTime(showtimeId: string): Promise<TicketType[]> {
    const res = await fetch(`${API_BASE_URL}/showtime/${showtimeId}/ticket-types`);
    return await res.json();
  },
};
