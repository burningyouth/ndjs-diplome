import {
  CreateHotelDto,
  SearchHotelParams,
  UpdateHotelDto,
} from './hotels.interfaces';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from './hotels.schema';

interface SearchParams extends SearchHotelParams {
  isEnabled: boolean;
}

@Injectable()
export class HotelsService {
  constructor(@InjectModel(Hotel.name) private model: Model<Hotel>) {}

  async create(data: CreateHotelDto): Promise<Hotel> {
    try {
      const createdHotel = new this.model(data);
      const saved = await createdHotel.save();

      return saved;
    } catch (error) {
      const message =
        error.code === 11000
          ? `Hotel '${data.title}' is already exists`
          : error.message;
      throw new BadRequestException(message);
    }
  }

  async findById(id: Id): Promise<Hotel> {
    return this.model.findById(id).exec();
  }

  async search(params: Partial<SearchParams>): Promise<Hotel[]> {
    const { offset, limit = 10, ...other } = params;
    return this.model
      .find(other, undefined, {
        skip: offset,
        limit,
      })
      .exec();
  }

  async update(id: Id, data: UpdateHotelDto): Promise<Hotel> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
