import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './users.interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Id } from 'src/global';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({
    type: String,
  })
  id: Id;

  @ApiProperty()
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ required: false })
  @Prop({ type: String })
  contactPhone: string;

  @ApiProperty({ enum: Role, default: Role.client })
  @Prop({ type: String, required: true, default: 'client' })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
