import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './shemas/user.schema';

const getData = (result: any) => {
  if (result) return result._doc;
  return result;
};

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return new this.userModel({
      ...createUserDto,
    })
      .save()
      .then(getData);
  }

  findOne(queryObj: object): Promise<User> {
    return this.userModel.findOne(queryObj).exec().then(getData);
  }

  getUserByEmail(email: string) {
    return this.findOne({ email });
  }
}
