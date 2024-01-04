import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: true,
})
export class SupportGateway {
  @SubscribeMessage('subscribeToChat')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: string,
  ): string {
    return 'Hello world!';
  }
}
