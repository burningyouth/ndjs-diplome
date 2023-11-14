export interface ReservationDto {
  hotelRoom: Id;
  startDate: DateTimeISO;
  endDate: DateTimeISO;
}

export interface ReservationSearchOptions {
  user: Id;
  startDate: Date;
  endDate: Date;
}
