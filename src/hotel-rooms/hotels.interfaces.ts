export interface SearchRoomsParams {
  limit: number;
  offset: number;
  hotel: Id;
  isEnabled?: boolean;
}

export interface IHotelRoom {
  hotel: Id;
  description: string;
  images: string[];
  isEnabled: boolean;
  createdAt: DateTimeISO;
  updatedAt: DateTimeISO;
}
