export interface SearchHotelParams {
  limit: number;
  offset: number;
  title: string;
}

export interface IHotel {
  title: string;
  description: string;
}
export type CreateHotelDto = IHotel;
export type UpdateHotelDto = Partial<CreateHotelDto>;
