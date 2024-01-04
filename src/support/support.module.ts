import { Module } from '@nestjs/common';
import { SupportClientService } from './services/support-client.service';
import { SupportEmployeeService } from './services/support-employee.service';
import { SupportService } from './services/support.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SupportMessage,
  SupportMessageSchema,
} from './schemas/support-message.schema';
import {
  SupportRequest,
  SupportRequestSchema,
} from './schemas/support-request.schema';
import { SupportGateway } from './support.gateway';
import { SupportController } from './support.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: SupportMessage.name, schema: SupportMessageSchema },
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
  ],
  providers: [
    SupportService,
    SupportClientService,
    SupportEmployeeService,
    SupportGateway,
  ],
  controllers: [SupportController],
})
export class SupportModule {}
