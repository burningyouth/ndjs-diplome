import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegistrationDto } from './auth.interfaces';
import * as bcrypt from 'bcrypt';
import { Id } from 'src/global';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.usersService.getFullUserByEmail(email);
    if (!user) throw new UnauthorizedException();
    const match = await bcrypt.compare(pass, user.passwordHash);
    if (!match) throw new UnauthorizedException();
    const payload = {
      id: user._id,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async register(userDto: RegistrationDto) {
    const user = await this.usersService.findByEmail(userDto.email);
    if (user) {
      throw new BadRequestException('Email exists!');
    }
    return this.usersService.create(userDto);
  }

  async validateUser(id: Id, passwordHash: string) {
    const user = await this.usersService.getFullUserById(id);
    if (user && user.passwordHash === passwordHash) {
      return user;
    }
    return null;
  }
}
