import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IHotel } from './hotels.interfaces';

@Schema()
export class Hotel extends Document implements IHotel {
  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, default: new Date().toISOString() })
  createdAt: DateTimeISO;

  @Prop({ type: String, default: new Date().toISOString() })
  updatedAt: DateTimeISO;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
