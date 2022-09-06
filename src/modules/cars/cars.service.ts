import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarDto } from './dto/create-car.dto';
import { GetCarsQueryDto } from './dto/get-cars-query.dto';
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

  update(_id: string, updateCar: UpdateCarDto): Promise<Car> {
    return this.carModel
      .findOneAndUpdate({ _id }, { ...updateCar, updatedAt: new Date() }, { new: true })
      .exec();
  }

  getCarById(_id: string): Promise<Car> {
    return this.carModel.findById(_id).exec().then(getData);
  }

  getCars(query: GetCarsQueryDto): Promise<Array<Car>> {
    const { skip, limit } = query;
    const dbQuery = this.carModel.find();
    if (skip) dbQuery.skip(parseInt(skip, 10));
    if (limit) dbQuery.limit(parseInt(limit, 10));
    return dbQuery.sort({ createdAt: 'desc' }).exec();
  }
}
