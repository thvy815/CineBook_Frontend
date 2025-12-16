import axios from "axios";
import type { MovieDetail } from "../../types/movie";

// ================== API Client ==================
const movieClient = axios.create({
  baseURL: "https://localhost:7194/api/moviehome",
  headers: { "Content-Type": "application/json" },
});
const DETAIL_URL = "https://localhost:7194/api/moviedetail";

// ================== Service ==================
export const movieService = {
  /** 🎥 GET /api/moviehome/now-playing — Lấy danh sách phim đang chiếu */
  getNowPlaying: async (): Promise<MovieDetail[]> => {
    const res = await movieClient.get<MovieDetail[]>("/now-playing");
    return res.data;
  },

  /** 🎬 GET /api/moviehome/upcoming — Lấy danh sách phim sắp chiếu */
  getUpcoming: async (): Promise<MovieDetail[]> => {
    const res = await movieClient.get<MovieDetail[]>("/upcoming");
    return res.data;
  },

  // ✅ Lấy chi tiết phim theo ID
  async getMovieDetail(id: string): Promise<MovieDetail> {
    const res = await axios.get(`${DETAIL_URL}/${id}`);
    return res.data;
  },
   searchMovies: async (
    title: string,
    page: number = 0,
    size: number = 10
  ): Promise<{ content: MovieDetail[] }> => {
    const res = await movieClient.get<{ content: MovieDetail[] }>("/search", {
      params: { title, page, size },
    });
    return res.data;
  },

  // Get movie stats overview
  getStatsOverview: async (): Promise<{
    totalMovies: number;
    nowPlaying: number;
    upcoming: number;
    archived: number;
  }> => {
    const res = await movieClient.get<{
      totalMovies: number;
      nowPlaying: number;
      upcoming: number;
      archived: number;
    }>("/stats/overview");
    return res.data;
  },
};
