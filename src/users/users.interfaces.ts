import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  admin = 'admin',
  manager = 'manager',
  client = 'client',
}

export class SearchUserParams {
  @ApiProperty({ required: false })
  limit?: number;
  @ApiProperty({ required: false })
  offset?: number;
  @ApiProperty({ required: false })
  email?: string;
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty({ required: false })
  contactPhone?: string;
}

export class CreateUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false })
  contactPhone?: string;
}
