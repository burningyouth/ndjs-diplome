import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JWTAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { parseToken } from 'src/common/token';
import { Role } from 'src/users/users.interfaces';
import {
  IFullReservation,
  ReservationDto,
  ReservationSearchOptions,
} from './reservations.interfaces';
import { ReservationsService } from './reservations.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Id } from 'src/global';

@ApiTags('reservations')
@UseGuards(JWTAuthGuard, RolesGuard)
@Controller()
export class ReservationsController {
  constructor(
    private service: ReservationsService,
    private jwtService: JwtService,
  ) {}

  @ApiResponse({
    status: 200,
    type: IFullReservation,
  })
  @HasRoles(Role.client)
  @Post('client/reservations')
  addReservation(
    @Body() data: ReservationDto,
    @Headers('authorization') authorization: string,
  ) {
    const { id } = this.jwtService.decode(parseToken(authorization));
    return this.service.addReservation(id, data);
  }

  @ApiResponse({
    status: 200,
    type: [IFullReservation],
  })
  @HasRoles(Role.client)
  @Get('client/reservations')
  getList(
    @Headers('authorization') authorization: string,
    @Query() query: ReservationSearchOptions,
  ) {
    const { id } = this.jwtService.decode(parseToken(authorization));
    return this.service.getReservations({
      ...query,
      user: id,
    });
  }

  @ApiResponse({
    status: 200,
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  @HasRoles(Role.client)
  @Delete('client/reservations/:id')
  async removeReservationClient(
    @Headers('authorization') authorization: string,
    @Param('id') id: Id,
  ) {
    const { id: userId } = this.jwtService.decode(parseToken(authorization));
    const reservation = await this.service.getReservationById(id);
    if (reservation.user !== userId)
      throw new UnauthorizedException('This is not your reservation');
    return this.service.removeReservation(id);
  }

  @ApiResponse({
    status: 200,
    type: [IFullReservation],
  })
  @ApiParam({
    name: 'userId',
    type: String,
  })
  @HasRoles(Role.manager)
  @Get('manager/reservations/:userId')
  getManagerList(
    @Query() query: ReservationSearchOptions,
    @Param('userId') userId: Id,
  ) {
    return this.service.getReservations({
      ...query,
      user: userId,
    });
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiResponse({
    status: 200,
  })
  @HasRoles(Role.manager)
  @Delete('manager/reservations/:id')
  async removeReservationManager(@Param('id') id: Id) {
    return this.service.removeReservation(id);
  }
}
