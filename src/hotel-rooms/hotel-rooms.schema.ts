import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Hotel } from 'src/hotels/hotels.schema';
import { IHotelRoom } from './hotels.interfaces';

@Schema()
export class HotelRoom extends Document implements IHotelRoom {
  @Prop({ type: Types.ObjectId, required: true, ref: Hotel.name })
  hotel: Id;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: [String], required: true, default: [] })
  images: string[];

  @Prop({ type: Boolean, required: true, default: true })
  isEnabled: boolean;

  @Prop({ type: String, default: new Date().toISOString() })
  createdAt: DateTimeISO;

  @Prop({ type: String, default: new Date().toISOString() })
  updatedAt: DateTimeISO;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
