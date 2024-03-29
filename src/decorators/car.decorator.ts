import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { BadRequestError } from '../exceptions/badrequest.exception';
import { NotFoundError } from '../exceptions/notfound.exception';
import { CarsService } from '../modules/cars/cars.service';

@Injectable()
export class CarExist implements CanActivate {
  constructor(private carsService: CarsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError('Invalid car ID.');
    }
    const car = await this.carsService.getCarById(id);
    if (!car) {
      throw new NotFoundError('Car not found.');
    }
    request.car = car;
    return true;
  }
}

@Injectable()
export class CarExistFromBody implements CanActivate {
  constructor(private carsService: CarsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;
    const { carId } = body;
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      throw new BadRequestError('Invalid car ID.');
    }
    const car = await this.carsService.getCarById(carId);
    if (!car) {
      throw new NotFoundError('Car not found.');
    }
    request.car = car;
    return true;
  }
}

@Injectable()
export class CarBelongsToUser implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user, car } = request;
    const { _id } = user;
    const { owner } = car;
    if (_id !== owner.toString()) {
      throw new BadRequestError('Car does not belong to you.');
    }
    return true;
  }
}
