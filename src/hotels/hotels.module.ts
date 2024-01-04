import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsController } from './hotels/hotels.controller';
import { Hotel, HotelSchema } from './hotels/hotels.schema';
import { HotelsService } from './hotels/hotels.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { HotelRoom, HotelRoomSchema } from './hotel-rooms/hotel-rooms.schema';
import { HotelRoomsService } from './hotel-rooms/hotel-rooms.service';
import { HotelRoomsController } from './hotel-rooms/hotel-rooms.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    PassportModule,
    JwtModule,
    MongooseModule.forFeature([
      { name: HotelRoom.name, schema: HotelRoomSchema },
      { name: Hotel.name, schema: HotelSchema },
    ]),
  ],
  providers: [HotelRoomsService, HotelsService],
  controllers: [HotelRoomsController, HotelsController],
  exports: [HotelRoomsService, HotelsService],
})
export class HotelsModule {}
