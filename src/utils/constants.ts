// src/utils/constants.ts

// 💡 URL backend — bạn thay bằng URL thật của bạn
export const API_BASE_URL = "https://localhost:7156";

// ===== SHOWTIME =====
export const SHOWTIME_ENDPOINT = {
  ticketTypes: (showtimeId: string) =>
    `${API_BASE_URL}/Showtime/${showtimeId}/ticket-types`,

  seats: (showtimeId: string) =>
    `${API_BASE_URL}/Showtime/${showtimeId}/seats`,

  info: (showtimeId: string) =>
    `${API_BASE_URL}/Showtime/${showtimeId}`,
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
    GET_ALL: `${API_BASE_URL}/api/Showtime`,
    GET_BY_ID: (id:string) => `${API_BASE_URL}/Showtime/${id}`,
    CREATE: `${API_BASE_URL}/api/Showtime`,
    UPDATE: (id: string) => `${API_BASE_URL}/Showtime/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/Showtime/${id}`,
    FILTER: `${API_BASE_URL}/api/Showtime/filter`,
    GENERATE: `${API_BASE_URL}/api/Showtime/generate-auto`,
  },
};

export const THEATER_ENDPOINTS = {
  THEATER: {
    GET_ALL: `${API_BASE_URL}/api/Theater`,
    CREATE: `${API_BASE_URL}/api/Theater`,
    UPDATE: (id: string) => `${API_BASE_URL}/api/Theater/${id}`,
  },
};

export const SEAT_ENDPOINTS = {
  GET_BY_ROOM: (roomId: string) => `${API_BASE_URL}/api/Seat/${roomId}`,
  CREATE: `${API_BASE_URL}/api/Seat`,
};

export const BOOKING_ENDPOINTS = {
  HOLD_SEATS: `${API_BASE_URL}/api/Booking/hold-seats`,
  CONFIRM: `${API_BASE_URL}/api/Booking/confirm`,
};

