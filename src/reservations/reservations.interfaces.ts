import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { DateTimeISO, Id } from 'src/global';
import { ShortHotelRoom } from 'src/hotel-rooms/hotel-rooms.interfaces';
import { ShortHotel } from 'src/hotels/hotels.interfaces';

export class ReservationDto {
  @ApiProperty({
    type: String,
  })
  hotelRoom: Id;
  @ApiProperty()
  startDate: DateTimeISO;
  @ApiProperty()
  endDate: DateTimeISO;
}

export class ReservationSearchOptions {
  user: Id;
  @ApiPropertyOptional()
  startDate: DateTimeISO;
  @ApiPropertyOptional()
  endDate: DateTimeISO;
}

export class IReservation {
  @ApiProperty({
    type: String,
  })
  hotel: Id;
  @ApiProperty({
    type: String,
  })
  hotelRoom: Id;
  @ApiProperty()
  startDate: DateTimeISO;
  @ApiProperty()
  endDate: DateTimeISO;
}

export class IFullReservation extends OmitType(IReservation, [
  'hotelRoom',
  'hotel',
] as const) {
  @ApiProperty({
    type: ShortHotel,
  })
  hotel: ShortHotel;
  @ApiProperty({
    type: ShortHotelRoom,
  })
  hotelRoom: ShortHotelRoom;
}
