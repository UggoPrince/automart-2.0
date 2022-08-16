import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from '../src/filters/validation.exception';
import { ValidationFilter } from '../src/filters/validation.filter';
import { config } from 'dotenv';

config();
process.env.SECRET = 'itijhfgiuehguou';

let app: INestApplication;
export let moduleFixture: TestingModule;

export async function bootstrap() {
  moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();

  app.setGlobalPrefix('api/v2');
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages: any = {};
        errors.map((error) => {
          messages[error.property] = Object.values(error.constraints);
        });
        return new ValidationException(messages);
      },
    }),
  );

  await app.init();
  return app;
}
