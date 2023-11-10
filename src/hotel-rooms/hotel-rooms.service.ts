import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelRoom } from './hotel-rooms.schema';
import { SearchRoomsParams } from './hotels.interfaces';

@Injectable()
export class HotelRoomsService {
  constructor(@InjectModel(HotelRoom.name) private model: Model<HotelRoom>) {}

  async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const room = new this.model(data);
    return room.save();
  }

  async findById(id: string): Promise<HotelRoom> {
    return this.model.findById(id).exec();
  }

  async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    return this.model.find(params).exec();
  }

  async update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.model.findByIdAndUpdate(id, data).exec();
  }
}
