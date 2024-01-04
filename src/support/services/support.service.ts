import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { SupportRequest } from '../schemas/support-request.schema';
import { GetChatListParams } from '../support.interfaces';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SupportService {
  constructor(
    @InjectModel(SupportRequest.name)
    private requestModel: Model<SupportRequest>, //private messageModel: Model<SupportMessage>,
  ) {}

  async findSupportRequests({
    offset = 0,
    limit = 10,
    ...params
  }: GetChatListParams) {
    return this.requestModel.find(params).skip(offset).limit(limit).exec();
  }

  // Вообще не понятно что тут
  //subscribe(
  //  handler: (supportRequest: SupportRequest, message: Message) => void,
  //) {}
}
