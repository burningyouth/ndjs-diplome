import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { DateTimeISO, Id } from 'src/global';
import { ShortHotel } from 'src/hotels/hotels/hotels.interfaces';

export class SearchRoomsParams {
  @ApiPropertyOptional()
  limit: number;
  @ApiPropertyOptional()
  offset: number;
  @ApiPropertyOptional({
    type: String,
  })
  hotel: Id;
  @ApiPropertyOptional()
  isEnabled?: boolean;
}

export class IHotelRoom {
  @ApiProperty({ type: String })
  hotel: Id;
  @ApiProperty()
  description: string;
  @ApiProperty()
  images: string[];
  @ApiProperty()
  isEnabled: boolean;
}

export class ShortHotelRoom {
  @ApiProperty({ type: String })
  id: Id;
  @ApiProperty()
  description: string;
  @ApiProperty()
  images: string[];
}

export class IFullHotelRoom {
  @ApiProperty({
    type: ShortHotel,
  })
  hotel: ShortHotel;
  @ApiProperty()
  description: string;
  @ApiProperty()
  images: string[];
  @ApiProperty()
  isEnabled: boolean;
  @ApiProperty({
    type: String,
  })
  createdAt: DateTimeISO;
  @ApiProperty({
    type: String,
  })
  updatedAt: DateTimeISO;
}

export class CreateHotelRoomDto {
  @ApiProperty()
  description: string;
  @ApiProperty()
  hotelId: string;
  @ApiPropertyOptional()
  images?: string[];
}

export class UpdateHotelRoomDto extends PartialType(CreateHotelRoomDto) {
  @ApiPropertyOptional()
  isEnabled?: boolean;
}
