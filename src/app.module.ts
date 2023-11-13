import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { HotelRoomsModule } from './hotel-rooms/hotel-rooms.module';
import { HotelsModule } from './hotels/hotels.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    AuthModule,
    HotelsModule,
    HotelRoomsModule,
    BookingsModule,
    HotelRoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
