/* eslint-disable @typescript-eslint/no-namespace */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { getDbUrl } from './utilities/getEnv';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CarsModule } from './modules/cars/cars.module';
import { AuthModule } from './modules/auth/auth.module';
import { FlagsModule } from './modules/flags/flags.module';

declare global {
  namespace Express {
    interface Request {
      car: any;
    }
  }
}

const dbUrl = getDbUrl();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(dbUrl),
    AuthModule,
    UsersModule,
    CarsModule,
    FlagsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
