import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { Document } from 'mongoose';
import { CreateHotelDto, UpdateHotelDto } from './hotels.interfaces';

@Schema({ timestamps: true })
export class Hotel extends Document {
  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;
}

export const createSchema = Joi.object<CreateHotelDto>({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateSchema = Joi.object<UpdateHotelDto>({
  title: Joi.string(),
  description: Joi.string(),
});

export const HotelSchema = SchemaFactory.createForClass(Hotel);
