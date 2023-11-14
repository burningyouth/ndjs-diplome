import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JWTAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUserDto, Role, SearchUserParams } from './users.interfaces';
import { UsersService } from './users.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.schema';

@ApiTags('users')
@UseGuards(JWTAuthGuard, RolesGuard)
@Controller()
export class UsersController {
  constructor(private service: UsersService) {}

  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: User,
  })
  @ApiBody({ type: CreateUserDto })
  @HasRoles(Role.admin)
  @Post('admin/users')
  async create(@Body() createUserDto: CreateUserDto) {
    const { _id, ...response } = await this.service.create(createUserDto);
    return { ...response, id: _id };
  }

  @ApiResponse({
    status: 200,
    type: [User],
  })
  @HasRoles(Role.admin)
  @Get('admin/users')
  getAdminList(@Query() query: SearchUserParams) {
    return this.service.findAll(query);
  }

  @ApiResponse({
    status: 200,
    type: [User],
  })
  @HasRoles(Role.manager)
  @Get('manager/users')
  getManagerList(@Query() query: SearchUserParams) {
    return this.getAdminList(query);
  }
}
