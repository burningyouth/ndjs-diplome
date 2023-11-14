import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Id } from 'src/global';

export class SearchHotelParams {
  @ApiPropertyOptional()
  limit: number;
  @ApiPropertyOptional()
  offset: number;
  @ApiPropertyOptional()
  title: string;
}

export class IHotel {
  @ApiProperty({
    type: String,
  })
  id: Id;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
}
export class ShortHotel {
  @ApiProperty({
    type: String,
  })
  id: Id;
  @ApiProperty()
  name: string;
}

export class CreateHotelDto extends OmitType(IHotel, ['id'] as const) {}
export class UpdateHotelDto extends PartialType(CreateHotelDto) {}
