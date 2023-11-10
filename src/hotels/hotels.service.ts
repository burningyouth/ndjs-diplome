import {
  CreateHotelDto,
  SearchHotelParams,
  UpdateHotelParams,
} from './hotels.interfaces';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from './hotels.schema';

@Injectable()
export class HotelsService {
  constructor(@InjectModel(Hotel.name) private model: Model<Hotel>) {}

  async create(data: CreateHotelDto): Promise<Hotel> {
    const createdHotel = new this.model(data);
    return createdHotel.save();
  }

  async findById(id: Id): Promise<Hotel> {
    return this.model.findById(id).exec();
  }

  async search(params: SearchHotelParams): Promise<Hotel[]> {
    return this.model.find(params).exec();
  }

  async update(id: Id, data: UpdateHotelParams): Promise<Hotel> {
    return this.model.findByIdAndUpdate(id, data).exec();
  }
}
