import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Id } from 'src/global';
import { HotelRoom } from 'src/hotel-rooms/hotel-rooms.schema';
import { Hotel } from 'src/hotels/hotels.schema';
import { User } from 'src/users/users.schema';

@Schema()
export class Reservation extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: Hotel.name })
  hotel: Id;

  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  user: Id;

  @Prop({ type: Types.ObjectId, required: true, ref: HotelRoom.name })
  hotelRoom: Id;

  @Prop({ type: Date, required: true })
  startDate: string;

  @Prop({ type: Date, required: true })
  endDate: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
