import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/shemas/user.schema';
import { UsersService } from '../users/users.service';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car, CarSchema } from './schemas/car.schema';

@Module({
  providers: [CarsService, UsersService],
  controllers: [CarsController],
  imports: [
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class CarsModule {}
