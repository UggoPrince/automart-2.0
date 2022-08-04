import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getDbUrl } from '../utilities/getEnv';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from './shemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const dbUrl = getDbUrl();

describe('UserController', () => {
  let controller: UserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      controllers: [UserController],
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(dbUrl),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AuthModule,
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
