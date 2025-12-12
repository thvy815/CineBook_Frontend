// src/utils/constants.ts

// 💡 URL backend — bạn thay bằng URL thật của bạn
export const API_BASE_URL = "http://localhost:8080/api";

// ===== SHOWTIME =====
export const SHOWTIME_ENDPOINT = {
  ticketTypes: (showtimeId: string) =>
    `${API_BASE_URL}/showtime/${showtimeId}/ticket-types`,

  seats: (showtimeId: string) =>
    `${API_BASE_URL}/showtime/${showtimeId}/seats`,

  info: (showtimeId: string) =>
    `${API_BASE_URL}/showtime/${showtimeId}`,
};

// ===== BOOKING =====
export const BOOKING_ENDPOINT = {
  holdSeats: `${API_BASE_URL}/booking/hold-seats`,
  confirm: `${API_BASE_URL}/booking/confirm`,
};

// ===== F&B =====
export const FNB_ENDPOINT = {
  items: `${API_BASE_URL}/fnb/items`,
};

// === SEAT ====
// src/constants/api.ts
export const ENDPOINTS = {
  SEAT: {
    GET_BY_ROOM: (roomId: string) => `${API_BASE_URL}/seat/${roomId}`,
    CREATE: `${API_BASE_URL}/seat`,
    GENERATE: `${API_BASE_URL}/seats/generate`,
  },
  SEAT_LOCK: {
    LOCK: `${API_BASE_URL}/seat-lock/lock`,
    VERIFY: `${API_BASE_URL}/seat-lock/verify`,
    MARK_BOOKED: `${API_BASE_URL}/seat-lock/booked`,
  },
};

// src/utils/constants.ts
export const SHOWTIME_ENDPOINTS = {
  SHOWTIME: {
    GET_ALL: "/showtime",
    GET_BY_ID: (id: string) => `/showtime/${id}`,
    CREATE: "/showtime",
    UPDATE: (id: string) => `/showtime/${id}`,
    DELETE: (id: string) => `/showtime/${id}`,
  },
  // seat / seat-lock ... như cũ
};
