import { Role } from 'src/users/users.interfaces';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegistrationDto {
  name: string;
  email: string;
  password: string;
  contactPhone?: string;
  role: Role;
}
