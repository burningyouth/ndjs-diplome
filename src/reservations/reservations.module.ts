import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './reservations.schema';
import {
  HotelRoom,
  HotelRoomSchema,
} from 'src/hotels/hotel-rooms/hotel-rooms.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
