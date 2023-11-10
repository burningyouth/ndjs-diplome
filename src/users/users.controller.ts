/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JWTAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUserDto, Role, SearchUserParams } from './users.interfaces';
import { UsersService } from './users.service';

@UseGuards(JWTAuthGuard, RolesGuard)
@Controller()
export class UsersController {
  constructor(private service: UsersService) {}

  @HasRoles(Role.admin)
  @Post('admin/users')
  async create(@Body() createUserDto: CreateUserDto) {
    const {
      _id,
      passwordHash: _,
      ...response
    } = await this.service.create(createUserDto);
    return { ...response, id: _id };
  }

  @HasRoles(Role.admin)
  @Get('admin/users')
  getAdminList(@Query() query: SearchUserParams) {
    return this.service.findAll(query);
  }

  @HasRoles(Role.manager)
  @Get('manager/users')
  getManagerList(@Query() query: SearchUserParams) {
    return this.getAdminList(query);
  }
}
