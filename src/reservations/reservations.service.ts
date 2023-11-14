import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { HotelRoom } from 'src/hotel-rooms/hotel-rooms.schema';
import {
  ReservationDto,
  ReservationSearchOptions,
} from './reservations.interfaces';
import { Reservation } from './reservations.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name) private model: Model<Reservation>,
    @InjectModel(HotelRoom.name) private roomModel: Model<HotelRoom>,
  ) {}

  getReservationById(id: Id) {
    return this.model
      .findById(id)
      .select('-user')
      .populate([
        { path: 'hotelRoom', select: 'id description images' },
        { path: 'hotel', select: 'id title' },
      ])
      .exec();
  }

  async addReservation(userId: Id, data: ReservationDto) {
    const isAlreadyReserved = Boolean(
      (
        await this.model
          .find({
            startDate: { $gte: data.startDate },
            endDate: { $lte: data.endDate },

            hotelRoom: data.hotelRoom,
          })
          .limit(1)
      ).length,
    );

    if (isAlreadyReserved)
      throw new BadRequestException('Room can not be reserved for that period');
    const room = await this.roomModel.findById(data.hotelRoom);
    if (!room) throw new BadRequestException('Room not found');
    const reservation = new this.model({
      ...data,
      hotel: room.hotel,
      user: userId,
    });
    const result = await (
      await reservation.save()
    ).populate([
      { path: 'hotelRoom', select: 'id description images' },
      { path: 'hotel', select: 'id title' },
    ]);
    return result;
  }

  async removeReservation(id: Id) {
    const removed = await this.model.findByIdAndDelete(id);

    if (!removed) throw new BadRequestException('Reservation not found');
  }

  getReservations(filter: ReservationSearchOptions) {
    const query: FilterQuery<ReservationSearchOptions> = { user: filter.user };
    if (filter.startDate) query.startDate = { $gte: filter.startDate };
    if (filter.endDate) query.endDate = { $lte: filter.endDate };
    return this.model
      .find(query)
      .select('-user')
      .populate([
        { path: 'hotelRoom', select: 'id description images' },
        { path: 'hotel', select: 'id title' },
      ])
      .exec();
  }
}
