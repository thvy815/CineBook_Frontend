export interface RoomDto {
  id: string;
  theaterId: string;
  name: string;
  seatCount: number;
  status: string;
}

export interface CreateRoomDto {
  theaterId: string;
  name: string;
  seatCount: number;
  status: string;
}

export interface UpdateRoomDto {
  theaterId: string;
  name: string;
  seatCount: number;
  status: string;
}

export interface AutoCreateRoomDto {
  theaterId: string;
  numberOfRooms: number;
  defaultSeatCount?: number;
}
