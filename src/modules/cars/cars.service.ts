import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarDto } from './dto/create-car.dto';
import { Car, CarDocument } from './schemas/car.schema';

const getData = (result: any) => {
  if (result) return result._doc;
  return result;
};

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private readonly userModel: Model<CarDocument>) {}
  create(createCarDto: CreateCarDto, owner: any): Promise<Car> {
    return new this.userModel({
      ...createCarDto,
      owner,
    })
      .save()
      .then(getData);
  }
}
