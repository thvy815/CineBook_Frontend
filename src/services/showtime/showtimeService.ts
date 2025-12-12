// src/services/showtime/showtimeService.ts
import axios from "axios";
import type { ShowTimeItem } from "../../types/showtime";
import { SHOWTIME_ENDPOINTS } from "../../utils/constants";

export const showtimeService = {
  getAllShowtimes: (): Promise<ShowTimeItem[]> => axios.get(SHOWTIME_ENDPOINTS .SHOWTIME.GET_ALL).then(res => res.data),

  getShowtime: (id: string): Promise<ShowTimeItem | null> =>
    axios.get(SHOWTIME_ENDPOINTS .SHOWTIME.GET_BY_ID(id))
      .then(res => res.data)
      .catch(err => {
        if (err.response?.status === 404) return null;
        throw err;
      }),

  createShowtime: (data: any) =>
    axios.post(SHOWTIME_ENDPOINTS .SHOWTIME.CREATE, data).then(res => res.data),

  updateShowtime: (id: string, data: any) =>
    axios.put(SHOWTIME_ENDPOINTS .SHOWTIME.UPDATE(id), data).then(res => res.data),

  deleteShowtime: (id: string) =>
    axios.delete(SHOWTIME_ENDPOINTS .SHOWTIME.DELETE(id)).then(res => res.data),
};
