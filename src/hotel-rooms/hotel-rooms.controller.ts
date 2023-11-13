import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FilesInterceptor } from '@nestjs/platform-express';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JWTAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/users/users.interfaces';
import { HotelRoomsService } from './hotel-rooms.service';
import {
  CreateHotelRoomDto,
  SearchRoomsParams,
  UpdateHotelRoomDto,
} from './hotels.interfaces';
@Controller()
export class HotelRoomsController {
  constructor(
    private service: HotelRoomsService,
    private jwtService: JwtService,
  ) {}

  @Get('common/hotel-rooms')
  getCommonList(
    @Query() params: SearchRoomsParams,
    @Headers('authorization') authorization: string,
  ) {
    const decoded = this.jwtService.decode(authorization.split(' ')[1]);
    const _params =
      !decoded || decoded.role === 'client'
        ? { ...params, isEnabled: true }
        : params;
    return this.service.search(_params);
  }

  @HasRoles(Role.admin)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('images'))
  @Post('admin/hotel-rooms')
  create(
    @Body() data: CreateHotelRoomDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })

        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    images: any[],
  ) {
    return this.service.create({
      ...data,
      images: images?.map((image) => image.path) ?? [],
    });
  }

  @HasRoles(Role.admin)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('images'))
  @Put('admin/hotel-rooms/:id')
  update(
    @Param('id') id: Id,
    @Body() data: UpdateHotelRoomDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })

        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    images: any[],
  ) {
    if (images) {
      return this.service.update(id, {
        ...data,
        images: images?.map((image) => image.path),
      });
    }
    return this.service.update(id, data);
  }
}
