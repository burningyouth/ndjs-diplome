import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/users.interfaces';

export class LoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class LoginResponse {
  @ApiProperty()
  accessToken: string;
}

export class RegistrationDto extends CreateUserDto {}
