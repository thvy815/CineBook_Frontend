export interface TheaterDto {
  id: string;
  name: string;
  address: string;
  description: string;
  provinceId: string;
  status: string;
}

export interface CreateTheaterDto {
  name: string;
  address: string;
  description: string;
  provinceId: string;
  status: string;
}

export interface UpdateTheaterDto {
  name: string;
  address: string;
  description: string;
  provinceId: string;
  status: string;
}
