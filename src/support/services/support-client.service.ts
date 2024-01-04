import { ForbiddenException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Id } from 'src/global';
import { SupportMessage } from '../schemas/support-message.schema';
import { SupportRequest } from '../schemas/support-request.schema';
import {
  CreateSupportRequestDto,
  MarkMessagesAsReadDto,
  SendMessageDto,
} from '../support.interfaces';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SupportClientService {
  constructor(
    @InjectModel(SupportRequest.name)
    protected requestModel: Model<SupportRequest>,
    @InjectModel(SupportMessage.name)
    protected messageModel: Model<SupportMessage>,
  ) {}

  async createSupportRequest(user: Id, data: CreateSupportRequestDto) {
    const newRequest = new this.requestModel({ user, ...data });
    return newRequest.save();
  }

  async sendMessage(author: Id, supportRequest: Id, data: SendMessageDto) {
    const request = await this.requestModel.findById(supportRequest);
    if (request.user.toString() !== author.toString())
      throw new ForbiddenException(
        'You are not allowed to send messages to this request',
      );

    const message = new this.messageModel({
      author,
      request: supportRequest,
      ...data,
    });
    const result = await (
      await message.save()
    ).populate({
      path: 'author',
      select: 'id name',
    });
    return result;
  }

  async getMessages(author: Id, supportRequest: Id) {
    const request = await this.requestModel.findById(supportRequest);
    if (request.user.toString() !== author.toString())
      throw new ForbiddenException(
        'You are not allowed to get messages from this request',
      );

    return this.messageModel
      .find({ request: supportRequest })
      .populate([{ path: 'author', select: 'id name' }])
      .exec();
  }

  async markMessagesAsRead(
    authorId: Id,
    supportRequest: Id,
    params: MarkMessagesAsReadDto,
  ) {
    const request = await this.requestModel.findById(supportRequest);
    if (request.user.toString() !== authorId.toString())
      throw new ForbiddenException(
        'You are not allowed to get messages from this request',
      );

    return this.messageModel
      .updateMany(
        {
          request: supportRequest,
          createdAt: { $lte: params.createdBefore },
        },
        { $set: { readAt: Date.now } },
      )
      .exec();
  }

  async getUnreadCount(supportRequest: Id): Promise<number> {
    return this.messageModel
      .countDocuments({ request: supportRequest, readAt: undefined })
      .exec();
  }
}
