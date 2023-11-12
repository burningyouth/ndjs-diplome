import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Hotel } from 'src/hotels/hotels.schema';
import { CreateHotelRoomDto, UpdateHotelRoomDto } from './hotels.interfaces';
import * as Joi from 'joi';

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

export const createSchema = Joi.object<CreateHotelRoomDto>({
  hotelId: Joi.string().required(),
  description: Joi.string(),
  images: Joi.array().items(Joi.string()),
});

export const updateSchema = Joi.object<UpdateHotelRoomDto>({
  hotelId: Joi.string(),
  description: Joi.string(),
  images: Joi.array().items(Joi.string()),
  isEnabled: Joi.boolean(),
});

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
