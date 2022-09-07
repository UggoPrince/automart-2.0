import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsService } from '../cars/cars.service';
import { Car, CarSchema } from '../cars/schemas/car.schema';
import { FlagsController } from './flags.controller';
import { FlagsService } from './flags.service';
import { Flag, FlagSchema } from './schemas/flag.schema';

@Module({
  providers: [FlagsService, CarsService],
  controllers: [FlagsController],
  imports: [
    MongooseModule.forFeature([
      { name: Flag.name, schema: FlagSchema },
      { name: Car.name, schema: CarSchema },
    ]),
  ],
})
export class FlagsModule {}
