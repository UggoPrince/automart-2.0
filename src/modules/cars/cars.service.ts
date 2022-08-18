import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car, CarDocument } from './schemas/car.schema';

const getData = (result: any) => {
  if (result) return result._doc;
  return result;
};

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private readonly carModel: Model<CarDocument>) {}
  create(createCarDto: CreateCarDto): Promise<Car> {
    return new this.carModel(createCarDto).save().then(getData);
  }

  update(_id: string, updateCar: UpdateCarDto) {
    return this.carModel.findOneAndUpdate(
      { _id },
      { ...updateCar, updatedAt: new Date() },
      { new: true },
    );
  }

  getCarById(_id: string) {
    return this.carModel.findById(_id).exec().then(getData);
  }
}
