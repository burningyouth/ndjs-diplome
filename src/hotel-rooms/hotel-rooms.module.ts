import { Module } from '@nestjs/common';
import { HotelRoomsController } from './hotel-rooms.controller';
import { HotelRoomsService } from './hotel-rooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelRoom, HotelRoomSchema } from './hotel-rooms.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  controllers: [HotelRoomsController],
  providers: [HotelRoomsService],
})
export class HotelRoomsModule {}
