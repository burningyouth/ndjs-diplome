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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JWTAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { JoiValidationPipe } from 'src/common/validation.pipe';
import { updateSchema } from 'src/hotels/hotels.schema';
import { Role } from 'src/users/users.interfaces';
import { createSchema } from './hotel-rooms.schema';
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
  @UsePipes(new JoiValidationPipe(createSchema))
  @UseInterceptors(FileInterceptor('images'))
  @Post('admin/hotel-rooms')
  create(
    @Body() data: CreateHotelRoomDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })

        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    images: any[],
  ) {
    const uploadedImages = images?.map((image) => image.path);
    const staticImages = data.images;

    if (uploadedImages || staticImages) {
      return this.service.create({
        ...data,
        images: (staticImages || []).concat(uploadedImages),
      });
    }
    return this.service.create(data);
  }

  @HasRoles(Role.admin)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(updateSchema))
  @UseInterceptors(FileInterceptor('images'))
  @Put('admin/hotels-rooms/:id')
  update(
    @Param('id') id: Id,
    @Body() data: UpdateHotelRoomDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })

        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    images: any[],
  ) {
    const uploadedImages = images?.map((image) => image.path);
    const staticImages = data.images;

    if (uploadedImages || staticImages) {
      return this.service.update(id, {
        ...data,
        images: (staticImages || []).concat(uploadedImages),
      });
    }
    return this.service.update(id, data);
  }
}
