import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './auth.interfaces';
import { JWTAuthGuard } from './jwt.auth.guard';

@Controller()
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('auth/login')
  login(@Body() user: LoginDto) {
    return this.service.login(user.email, user.password);
  }

  @Post('client/register')
  async register(@Body() user: RegistrationDto) {
    const { _id, email, role } = await this.service.register(user);

    return {
      id: _id,
      email,
      role,
    };
  }

  @Post('auth/logout')
  @UseGuards(JWTAuthGuard)
  async logout(@Req() req) {
    req.logout();
    return { message: 'Logged out successfully' };
  }
}
