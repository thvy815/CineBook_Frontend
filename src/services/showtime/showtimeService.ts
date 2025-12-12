import axios from "axios";
import { API_BASE_URL, SHOWTIME_ENDPOINTS, THEATER_ENDPOINTS } from "../../utils/constants";

interface FilterParams {
  theaterId?: string;  // Id của rạp
  movieId?: string;    // Id của phim
  date?: string;       // yyyy-MM-dd
}

export const showtimeService = {
  getAll: async () => {
    const res = await axios.get(SHOWTIME_ENDPOINTS.SHOWTIME.GET_ALL);
    return res.data;
  },

  getById: async (id: string) => {
    const res = await axios.get(SHOWTIME_ENDPOINTS.SHOWTIME.GET_BY_ID(id));
    return res.data;
  },

  getAllTheater: async () => {
    const res = await axios.get(THEATER_ENDPOINTS.THEATER.GET_ALL);
    return res.data;
  },

  // 🔥 HÀM LỌC MỚI
  getByFilter: async (params: FilterParams) => {
    const query: any = {};
    if (params.theaterId) query.theaterId = params.theaterId;
    if (params.movieId) query.movieId = params.movieId;
    if (params.date) query.date = params.date;  
    const res = await axios.get("/api/Showtime/filter", { params: query });
    return res.data;
  }
};
