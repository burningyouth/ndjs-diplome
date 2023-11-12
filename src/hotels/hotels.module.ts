import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsController } from './hotels.controller';
import { Hotel, HotelSchema } from './hotels.schema';
import { HotelsService } from './hotels.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
  ],
  providers: [HotelsService],
  controllers: [HotelsController],
})
export class HotelsModule {}
