import axios from "axios";

// ================== Interfaces ==================
export interface MovieDetail {
  id?: string;
  tmdbId?: number;
  title: string;
  age: string;
  genres: string[];
  time: number;
  country: string;
  spokenLanguages: string[];
  crew: string[];
  cast: string[];
  releaseDate: string;
  overview: string;
  trailer: string;
  posterUrl: string;
  status: string;
}

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
};
