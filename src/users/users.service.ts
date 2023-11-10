import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import {
  CreateUserDto,
  IUserService,
  SearchUserParams,
} from './users.interfaces';
import { User } from './users.schema';

@Injectable()
export class UsersService implements IUserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password, salt);
    const user = { ...data, passwordHash: hashPassword };
    const newUser = new this.userModel(user);
    return newUser.save();
  }
  findById(id: Id) {
    return this.userModel.findById(id).exec();
  }
  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
  findAll(params: SearchUserParams) {
    return this.userModel.find(params).exec();
  }
}
