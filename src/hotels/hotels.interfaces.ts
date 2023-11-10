export interface SearchHotelParams {
  limit: number;
  offset: number;
  title: string;
}

export interface UpdateHotelParams {
  title: string;
  description: string;
}

export interface IHotel {
  title: string;
  description: string;
  createdAt: DateTimeISO;
  updatedAt: DateTimeISO;
}
export type CreateHotelDto = IHotel;
