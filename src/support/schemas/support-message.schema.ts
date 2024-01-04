import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Id } from 'src/global';
import { User } from 'src/users/users.schema';
import { SupportRequest } from './support-request.schema';

export type SupportMessageDocument = SupportMessage & Document;

@Schema()
export class SupportMessage {
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  author: Id;

  @Prop({ type: Types.ObjectId, required: true, ref: SupportRequest.name })
  request: Id;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: Date, required: true, default: Date.now })
  sentAt: Date;

  @Prop({ type: Date })
  readAt: Date | null;
}

export const SupportMessageSchema =
  SchemaFactory.createForClass(SupportMessage);
