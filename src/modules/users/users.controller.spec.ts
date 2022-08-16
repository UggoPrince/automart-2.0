import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getDbUrl } from '../../utilities/getEnv';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from './shemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const dbUrl = getDbUrl();

describe('UserController', () => {
  let controller: UsersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      controllers: [UsersController],
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(dbUrl),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AuthModule,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
