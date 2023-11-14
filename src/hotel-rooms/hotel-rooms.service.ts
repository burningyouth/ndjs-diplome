import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelRoom } from './hotel-rooms.schema';
import {
  CreateHotelRoomDto,
  IFullHotelRoom,
  SearchRoomsParams,
  UpdateHotelRoomDto,
} from './hotels.interfaces';

@Injectable()
export class HotelRoomsService {
  constructor(
    @InjectModel(HotelRoom.name) private model: Model<IFullHotelRoom>,
  ) {}

  async create(data: CreateHotelRoomDto) {
    const { hotelId, ...other } = data;
    const room = new this.model({ ...other, hotel: hotelId });
    return (await room.save()).populate('hotel', 'id title description');
  }

  async findById(id: Id) {
    return this.model
      .findById(id)
      .populate('hotel', 'id title description')
      .exec();
  }

  async search(params: Partial<SearchRoomsParams>) {
    const { limit = 10, ...other } = params;
    return this.model
      .find(other)
      .limit(limit)
      .populate('hotel', 'id title description')
      .exec();
  }

  async update(id: Id, data: UpdateHotelRoomDto) {
    const { hotelId, ...other } = data;
    return this.model
      .findByIdAndUpdate(id, { ...other, hotel: hotelId }, { new: true })
      .populate('hotel', 'id title description')
      .exec();
  }
}
