import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/users.interfaces';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);
