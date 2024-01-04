import { Injectable } from '@nestjs/common';
import { Id } from 'src/global';
import { SupportClientService } from './support-client.service';
import { MarkMessagesAsReadDto, SendMessageDto } from '../support.interfaces';

@Injectable()
export class SupportEmployeeService extends SupportClientService {
  closeRequest(supportRequest: Id) {
    return this.requestModel
      .findByIdAndUpdate(supportRequest, { isActive: false })
      .exec();
  }

  async markMessagesAsRead(
    _: Id,
    supportRequest: Id,
    params: MarkMessagesAsReadDto,
  ) {
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

  async sendMessage(author: Id, supportRequest: Id, data: SendMessageDto) {
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

  async getMessages(supportRequest: Id) {
    return this.messageModel
      .find({ request: supportRequest })
      .populate([{ path: 'author', select: 'id name' }])
      .exec();
  }
}
