import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { getDbUrl } from './utilities/getEnv';
import { LoggerMiddleware } from './middlewares/logger.middleware';
// import { AppService } from './services/app.service';
// import { UserController } from './user/user.controller';

const dbUrl = getDbUrl();

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(dbUrl), UserModule],
  // controllers: [UserController],
  // providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
