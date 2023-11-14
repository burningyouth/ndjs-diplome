import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponse, RegistrationDto } from './auth.interfaces';
import { JWTAuthGuard } from './jwt.auth.guard';
import { loginSchema, registerSchema } from './auth.schema';
import { JoiValidationPipe } from 'src/common/validation.pipe';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/users.schema';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiResponse({
    status: 200,
    type: LoginResponse,
  })
  @UsePipes(new JoiValidationPipe(loginSchema))
  @Post('auth/login')
  login(@Body() user: LoginDto) {
    return this.service.login(user.email, user.password);
  }

  @ApiResponse({
    status: 200,
    type: User,
  })
  @UsePipes(new JoiValidationPipe(registerSchema))
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
    req.logout((err) => console.log(err));
    return { message: 'Logged out successfully' };
  }
}
