export enum Role {
  admin = 'admin',
  manager = 'manager',
  client = 'client',
}

export interface IUser {
  email: string;
  passwordHash: string;
  name: string;
  contactPhone?: string;
  role: Role;
}

export interface SearchUserParams {
  limit?: number;
  offset?: number;
  email?: string;
  name?: string;
  contactPhone?: string;
}

export type CreateUserDto = Omit<IUser, 'passwordHash'> & { password: string };
