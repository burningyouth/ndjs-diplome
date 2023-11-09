import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './users.interfaces';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  _id: Id;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  contactPhone: string;

  @Prop({ required: true, default: 'client' })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
