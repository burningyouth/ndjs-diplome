import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Id } from 'src/global';
import { User } from 'src/users/users.schema';

export type SupportRequestDocument = SupportRequest & Document;

@Schema({ timestamps: true })
export class SupportRequest extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  user: Id;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  // Зачем здесь этот массив? Адекватнее хранить в отдельной коллекции. Даже если и так нужно оставить, то не совсем понятно как это реализовывать
  //@Prop({ type: SupportMessage })
  //messages: SupportMessage[];

  createdAt: string;
  updatedAt: string;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
