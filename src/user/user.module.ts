import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './shemas/user.schema';
import { UserExistReturn } from '../middlewares/user.middleware';
import signupValidation from '../middlewares/validation/user/signup';
import signinValidation from '../middlewares/validation/user/signin';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), AuthModule],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(signupValidation, UserExistReturn).forRoutes('auth/signup');
    consumer.apply(signinValidation).forRoutes('auth/login');
  }
}
