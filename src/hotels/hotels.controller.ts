import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JWTAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { JoiValidationPipe } from 'src/common/validation.pipe';
import { Role } from 'src/users/users.interfaces';
import {
  CreateHotelDto,
  IHotel,
  SearchHotelParams,
  UpdateHotelDto,
} from './hotels.interfaces';
import { updateSchema } from './hotels.schema';
import { HotelsService } from './hotels.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Id } from 'src/global';
@ApiTags('hotels')
@HasRoles(Role.admin)
@UseGuards(JWTAuthGuard, RolesGuard)
@Controller()
export class HotelsController {
  constructor(private service: HotelsService) {}

  @ApiResponse({
    status: 200,
    type: [IHotel],
  })
  @Get('admin/hotels')
  getList(@Query() params: SearchHotelParams) {
    return this.service.search(params);
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    type: IHotel,
  })
  @Get('admin/hotels/:id')
  getById(@Param('id') id: Id) {
    return this.service.findById(id);
  }

  @ApiResponse({
    status: 200,
    type: IHotel,
  })
  @Post('admin/hotels')
  create(@Body() data: CreateHotelDto) {
    return this.service.create(data);
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    type: IHotel,
  })
  @UsePipes(new JoiValidationPipe(updateSchema))
  @Put('admin/hotels/:id')
  update(@Param('id') id: Id, @Body() data: UpdateHotelDto) {
    return this.service.update(id, data);
  }
}
