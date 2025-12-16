import axios from "axios";
import type {
  ShowtimeDto,
  CreateShowtimeDto,
  TheaterShowtime,
} from "../../types/showtime";

const api = axios.create({
  baseURL: "https://localhost:7156/api/Showtime",
  headers: { "Content-Type": "application/json" },
});

export const showtimeService = {
  // GET ALL
  getAll: async (): Promise<ShowtimeDto[]> => {
    const res = await api.get("");
    return res.data;
  },

  // GET BY ID
  getById: async (id: string): Promise<ShowtimeDto> => {
    const res = await api.get(`/${id}`);
    return res.data;
  },

  // CREATE
  create: async (data: CreateShowtimeDto): Promise<ShowtimeDto> => {
    const res = await api.post("", data);
    return res.data;
  },

  // UPDATE
  update: async (
    id: string,
    data: CreateShowtimeDto
  ): Promise<ShowtimeDto> => {
    const res = await api.put(`/${id}`, data);
    return res.data;
  },

  // DELETE
  delete: async (id: string): Promise<void> => {
    await api.delete(`/${id}`);
  },

  // GENERATE AUTO SHOWTIMES (5 days)
  generateAuto: async (
    theaterId: string,
    roomId: string
  ): Promise<{ message: string }> => {
    const res = await api.post("/generate-auto", null, {
      params: {
        theaterId,
        roomId,
      },
    });
    return res.data;
  },

  // FILTER (theater / movie / date)
  filter: async (
    theaterId?: string,
    movieId?: string,
    date?: string
  ): Promise<ShowtimeDto[]> => {
    const res = await api.get("/filter", {
      params: {
        theaterId,
        movieId,
        date,
      },
    });
    return res.data;
  },

  // FILTER BY THEATER + DATE
  filterByTheaterAndDate: async (
    theaterId?: string,
    movieId?: string,
    date?: string
  ): Promise<ShowtimeDto[]> => {
    const res = await api.get("/filterByTheaterAndDate", {
      params: {
        theaterId,
        movieId,
        date,
      },
    });
    return res.data;
  },

  // FILTER BY ALL (province + movie + date)
  filterByAll: async (
    provinceId: string,
    movieId: string,
    date: string
  ): Promise<TheaterShowtime[]> => {
    const res = await api.get("/filterByAll", {
      params: {
        provinceId,
        movieId,
        date,
      },
    });
    return res.data;
  },
};
