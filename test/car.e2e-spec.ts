import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

let app: INestApplication;
let moduleFixture: TestingModule;

const user = {
  email: 'johndoe@gmail.com',
  password: 'Doe$123456',
};
let token1 = '';
// let car1Id = '';

beforeAll(async () => {
  moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  const login1 = await request(app.getHttpServer()).post('/auth/login').send(user);
  token1 = login1.body.data.access_token;
});

afterAll(async () => {
  await moduleFixture.close();
});

describe('User e2e tests', () => {
  describe('POST /api/v2/car', () => {
    it('should not save a car if not unauthorized', async () => {
      const res = await request(app.getHttpServer())
        .post('/car')
        .set({ 'Content-Type': 'multipart/form-data' })
        .set({ Authorization: 'Bearer ' })
        .field('state', 'news');
      expect(res.status).toEqual(401);
    });
    it('should not save a car if a field value is invalid', async () => {
      const res = await request(app.getHttpServer())
        .post('/car')
        .set({ 'Content-Type': 'multipart/form-data' })
        .set({ Authorization: `Bearer ${token1}` })
        .field('state', 'news');
      expect(res.status).toEqual(422);
    });
  });
  /* describe('PATCH /api/v2/car/{id}', () => {
    it('should not update a car if car id is not valid', async () => {
      const res = await request(app.getHttpServer())
        .patch('/car/')
        .set({ 'Content-Type': 'multipart/form-data' })
        .set({ Authorization: 'Bearer ' })
        .field('state', 'news');
      expect(res.status).toEqual(401);
    });
  }); */
});
