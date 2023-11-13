import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Hotel } from 'src/hotels/hotels.schema';

@Schema({ timestamps: true })
export class HotelRoom extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: Hotel.name })
  hotel: Id;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: Boolean, required: true, default: true })
  isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
