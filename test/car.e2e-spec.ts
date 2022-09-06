import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { bootstrap, moduleFixture } from './app';

let app: INestApplication;

const user = {
  email: 'johndoe@gmail.com',
  password: 'Doe$123456',
};
let token1 = '';
// let car1Id = '';
const loginEndpoint = '/api/v2/auth/login';
const carEndpoint = '/api/v2/cars';

beforeAll(async () => {
  app = await bootstrap();

  const login1 = await request(app.getHttpServer()).post(loginEndpoint).send(user);
  token1 = login1.body.data.access_token;
});

afterAll(async () => {
  await moduleFixture.close();
});

describe('Car e2e tests', () => {
  describe('POST /api/v2/cars', () => {
    it('should not save a car if not unauthorized', async () => {
      const res = await request(app.getHttpServer())
        .post(carEndpoint)
        .set({ 'Content-Type': 'multipart/form-data' })
        .set({ Authorization: 'Bearer ' })
        .field('state', 'news');
      expect(res.status).toEqual(401);
    });
    it('should not save a car if a field value is invalid', async () => {
      const res = await request(app.getHttpServer())
        .post(carEndpoint)
        .set({ 'Content-Type': 'multipart/form-data' })
        .set({ Authorization: `Bearer ${token1}` })
        .field('state', 'news');
      expect(res.status).toEqual(422);
    });
  });
  describe('GET /api/v2/cars', () => {
    it('should get cars', async () => {
      const res = await request(app.getHttpServer()).get(carEndpoint);
      expect(res.status).toEqual(200);
    });
    it('should not get cars', async () => {
      const res = await request(app.getHttpServer()).get(carEndpoint).query({ limit: 'd' });
      expect(res.status).toEqual(422);
    });
  });
});
