import { ApiProperty } from '@nestjs/swagger';
import { DateTimeISO, Id } from 'src/global';

export class PaginationParams {
  @ApiProperty({
    type: Number,
    required: false,
  })
  limit: number | undefined;
  @ApiProperty({
    type: Number,
    required: false,
  })
  offset: number | undefined;
}

export class CreateSupportRequestDto {
  @ApiProperty({
    type: String,
  })
  text: string;
}

export class GetSupportRequestsParams extends PaginationParams {
  @ApiProperty({
    type: Boolean,
    required: false,
  })
  isActive: boolean | undefined;
}

export class SendMessageDto {
  @ApiProperty({
    type: String,
  })
  text: string;
}

export class MarkMessagesAsReadDto {
  @ApiProperty()
  createdBefore: DateTimeISO;
}

export class GetChatListParams extends PaginationParams {
  @ApiProperty({
    type: String,
  })
  user: Id;
  @ApiProperty({
    type: Boolean,
    required: false,
  })
  isActive: boolean;
}

export class ISupportRequestClient {
  @ApiProperty({
    type: String,
  })
  id: Id;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({
    type: String,
  })
  contactPhone: string;
}

export class IShortSupportRequest {
  @ApiProperty({
    type: String,
  })
  id: Id;

  @ApiProperty({
    type: Boolean,
  })
  isActive: boolean;

  @ApiProperty()
  createdAt: DateTimeISO;

  @ApiProperty({
    type: Boolean,
  })
  hasNewMessages: boolean;
}

export class ISupportRequest extends IShortSupportRequest {
  @ApiProperty({
    type: ISupportRequestClient,
  })
  client: ISupportRequestClient;
}

export class ISupportAuthor {
  @ApiProperty({
    type: String,
  })
  id: Id;

  @ApiProperty({
    type: String,
  })
  name: string;
}

export class ISupportMessage {
  @ApiProperty({
    type: String,
  })
  id: Id;

  @ApiProperty({
    type: String,
  })
  text: string;

  @ApiProperty({
    type: String,
  })
  readAt: DateTimeISO;

  @ApiProperty({
    type: ISupportAuthor,
  })
  author: ISupportAuthor;
}
