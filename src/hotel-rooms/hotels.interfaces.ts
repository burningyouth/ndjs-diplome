export interface SearchRoomsParams {
  limit: number;
  offset: number;
  hotel: Id;
  isEnabled?: boolean;
}

export interface IHotelRoom {
  hotel: Id;
  description?: string;
  images?: string[];
  isEnabled: boolean;
}

export interface IFullHotelRoom extends Omit<IHotelRoom, 'hotel'> {
  hotel: Array<{
    id: Id;
    title: string;
  }>;
  createdAt: DateTimeISO;
  updatedAt: DateTimeISO;
}

export type CreateHotelRoomDto = {
  description: string;
  hotelId: string;
  images?: string[];
};
export type UpdateHotelRoomDto = {
  description: string;
  hotelId: string;
  isEnabled: boolean;
  images?: string[];
};
