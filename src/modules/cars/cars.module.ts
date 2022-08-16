import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car, CarSchema } from './schemas/car.schema';

@Module({
  providers: [CarsService],
  controllers: [CarsController],
  imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
})
export class CarsModule {}
