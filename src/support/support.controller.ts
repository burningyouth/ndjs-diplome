import {
  Body,
  Controller,
  Post,
  UseGuards,
  Headers,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { SupportService } from './services/support.service';
import { SupportClientService } from './services/support-client.service';
import { SupportEmployeeService } from './services/support-employee.service';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { parseToken } from 'src/common/token';
import { Role } from 'src/users/users.interfaces';
import {
  CreateSupportRequestDto,
  GetSupportRequestsParams,
  IShortSupportRequest,
  ISupportMessage,
  ISupportRequest,
  MarkMessagesAsReadDto,
  SendMessageDto,
} from './support.interfaces';
import { JwtService } from '@nestjs/jwt';
import { Id } from 'src/global';

@ApiTags('support')
@UseGuards(JWTAuthGuard, RolesGuard)
@Controller()
export class SupportController {
  constructor(
    private service: SupportService,
    private clientService: SupportClientService,
    private employeeService: SupportEmployeeService,
    private jwtService: JwtService,
  ) {}

  @ApiResponse({
    status: 200,
    type: IShortSupportRequest,
  })
  @HasRoles(Role.client)
  @Post('client/support-requests')
  async clientAddSupportRequest(
    @Body() data: CreateSupportRequestDto,
    @Headers('authorization') authorization: string,
  ): Promise<IShortSupportRequest> {
    const { id } = this.jwtService.decode(parseToken(authorization));
    const result = await this.clientService.createSupportRequest(id, data);

    return {
      id: result.id,
      createdAt: result.createdAt,
      isActive: result.isActive,
      hasNewMessages: false,
    };
  }

  // Как сделать так, чтобы в ответе был тип IShortSupportRequest, а не то что выдает mongodb? Конкретно не понятно как флаг hasNewMessages выставить для каждого реквеста
  @ApiResponse({
    status: 200,
    type: [IShortSupportRequest],
  })
  @HasRoles(Role.client)
  @Get('client/support-requests')
  clientGetRequests(
    @Query() query: GetSupportRequestsParams,
    @Headers('authorization') authorization: string,
  ) {
    const { id } = this.jwtService.decode(parseToken(authorization));
    return this.service.findSupportRequests({ user: id, ...query });
  }

  // Тут тоже ответ не тот, что нужен
  @ApiResponse({
    status: 200,
    type: [ISupportRequest],
  })
  @HasRoles(Role.manager)
  @Get('manager/support-requests')
  mangerGetRequests(
    @Query() query: GetSupportRequestsParams,
    @Headers('authorization') authorization: string,
  ) {
    const { id } = this.jwtService.decode(parseToken(authorization));
    return this.service.findSupportRequests({ user: id, ...query });
  }

  @ApiResponse({
    status: 200,
    type: [ISupportMessage],
  })
  @ApiParam({
    name: 'requestId',
    type: String,
  })
  @HasRoles(Role.client, Role.manager)
  @Get('common/support-requests/:requestId/messages')
  getMessages(
    @Headers('authorization') authorization: string,
    @Param('requestId') requestId: Id,
  ) {
    const { id, role } = this.jwtService.decode(parseToken(authorization));
    if (role === Role.client) {
      return this.clientService.getMessages(id, requestId);
    }
    return this.employeeService.getMessages(requestId);
  }

  @ApiResponse({
    status: 200,
    type: [ISupportMessage],
  })
  @ApiParam({
    name: 'requestId',
    type: String,
  })
  @HasRoles(Role.client, Role.manager)
  @Post('common/support-requests/:requestId/messages')
  sendMessage(
    @Headers('authorization') authorization: string,
    @Param('requestId') requestId: Id,
    @Body() data: SendMessageDto,
  ) {
    const { id, role } = this.jwtService.decode(parseToken(authorization));
    if (role === Role.client) {
      return this.clientService.sendMessage(id, requestId, data);
    }
    return this.employeeService.sendMessage(id, requestId, data);
  }

  @ApiParam({
    name: 'requestId',
    type: String,
  })
  @HasRoles(Role.client, Role.manager)
  @Post('common/support-requests/:requestId/messages/read')
  async readMessages(
    @Headers('authorization') authorization: string,
    @Param('requestId') requestId: Id,
    @Body() data: MarkMessagesAsReadDto,
  ) {
    const { id, role } = this.jwtService.decode(parseToken(authorization));
    if (role === Role.client) {
      await this.clientService.markMessagesAsRead(id, requestId, data);
    } else {
      await this.employeeService.markMessagesAsRead(id, requestId, data);
    }
    return {
      success: true,
    };
  }

  // Почему то не указано что нужно делать ручку для закрытия реквеста, я ее добавил
  @ApiParam({
    name: 'requestId',
    type: String,
  })
  @HasRoles(Role.manager)
  @Post('manager/support-requests/:requestId/close')
  async closeRequest(@Param('requestId') requestId: Id) {
    await this.employeeService.closeRequest(requestId);

    return {
      success: true,
    };
  }
}
