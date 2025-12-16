import axios from "axios";
import type {
  RoomDto,
  CreateRoomDto,
  UpdateRoomDto,
  AutoCreateRoomDto,
} from "../../types/room";

const api = axios.create({
  baseURL: "https://localhost:7156/api/Room",
  headers: { "Content-Type": "application/json" },
});

export const roomService = {
  // GET BY THEATER
  getByTheater: async (theaterId: string): Promise<RoomDto[]> => {
    const res = await api.get(`/${theaterId}`);
    return res.data;
  },

  // CREATE
  create: async (data: CreateRoomDto): Promise<RoomDto> => {
    const res = await api.post("", data);
    return res.data;
  },

  // UPDATE
  update: async (
    id: string,
    data: UpdateRoomDto
  ): Promise<RoomDto> => {
    const res = await api.put(`/${id}`, data);
    return res.data;
  },

  // AUTO CREATE ROOMS
  autoCreate: async (
    data: AutoCreateRoomDto
  ): Promise<RoomDto[]> => {
    const res = await api.post("/auto-create", data);
    return res.data;
  },
};
