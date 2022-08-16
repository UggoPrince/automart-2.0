import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { bootstrap, moduleFixture } from './app';

let app: INestApplication;
const signupEndpoint = '/api/v2/user';
const loginEndpoint = '/api/v2/auth/login';

beforeAll(async () => {
  app = await bootstrap();
});

afterAll(async () => {
  await moduleFixture.close();
});

describe('User e2e tests', () => {
  const newUser = {
    firstName: 'john',
    lastName: 'matthew',
    email: 'johnmatthew@gmail.com',
    password: 'K12345k$ljd',
    address: 'no 3 ikorodu',
  };
  const newUser2 = {
    firstName: 'john',
    lastName: 'matthew',
    email: 'joshua@gmail.com',
    password: 'K12345k$ljd',
    address: 'no 3 ikorodu',
  };
  const newUser3 = {
    firstName: 'john',
    lastName: 'matthew',
    email: 'admin@gmail.com',
    password: 'K12345k$ljd',
    address: 'no 3 ikorodu',
  };
  const invalidData = {
    firstName: 45,
    lastName: 'matthew*-*',
    email: 'johnmatthewgmail.com',
    password: 'k123',
    address: '12****---',
  };

  describe('POST /api/v2/user', () => {
    it('should sign up a user', async () => {
      const res = await request(app.getHttpServer()).post('/api/v2/user').send(newUser);
      expect(res.status).toEqual(201);
      expect(res.type).toEqual('application/json');
      expect(res.body.data).toHaveProperty('access_token');
    });
    it('should not sign up a user if user has an account with the specified email.', async () => {
      const res = await request(app.getHttpServer()).post(signupEndpoint).send(newUser);
      expect(res.status).toEqual(409);
      expect(res.type).toEqual('application/json');
      expect(res.body).toHaveProperty('message');
    });
    it('should sign up a user', async () => {
      const res = await request(app.getHttpServer()).post(signupEndpoint).send(newUser2);
      expect(res.status).toEqual(201);
      expect(res.type).toEqual('application/json');
      expect(res.body.data).toHaveProperty('access_token');
    });
    it('should not sign up a user if one or all the fields are missing', async () => {
      const res = await request(app.getHttpServer()).post(signupEndpoint).send({});
      expect(res.status).toEqual(422);
      expect(res.type).toEqual('application/json');
      expect(res.body).toHaveProperty('message');
    });
    it('should sign up a user', async () => {
      const res = await request(app.getHttpServer()).post(signupEndpoint).send(newUser3);
      expect(res.status).toEqual(201);
      expect(res.type).toEqual('application/json');
      expect(res.body.data).toHaveProperty('access_token');
    });
    it('should not sign up a user one or all the fields are invalid', async () => {
      const res = await request(app.getHttpServer()).post(signupEndpoint).send(invalidData);
      expect(res.status).toEqual(422);
      expect(res.type).toEqual('application/json');
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('POST /api/v2/auth/login', () => {
    const admin = {
      email: 'johndoe@gmail.com',
      password: 'Doe$123456',
    };
    const user = {
      email: 'johnmatthew@gmail.com',
      password: 'K12345k$ljd',
    };
    it('should sign in a user', async () => {
      const res = await request(app.getHttpServer()).post(loginEndpoint).send(admin);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual('application/json');
      expect(res.body.data).toHaveProperty('access_token');
    });
    it('should sign in a user', async () => {
      const res = await request(app.getHttpServer()).post(loginEndpoint).send(user);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual('application/json');
      expect(res.body.data).toHaveProperty('access_token');
    });
    it('should sign in a user', async () => {
      const res = await request(app.getHttpServer()).post(loginEndpoint).send(user);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual('application/json');
      expect(res.body.data).toHaveProperty('access_token');
    });
    it('should not sign in a user when one or all fields are not provided', async () => {
      const res = await request(app.getHttpServer()).post(loginEndpoint).send({});
      expect(res.status).toEqual(401);
      expect(res.type).toEqual('application/json');
      expect(res.body).toHaveProperty('message');
    });
    it('should not sign in a user when a wrong email is provided', async () => {
      const res = await request(app.getHttpServer())
        .post(loginEndpoint)
        .send({ email: 'thony@gmail.com', password: 'kh123456kjhf' });
      expect(res.status).toEqual(401);
      expect(res.type).toEqual('application/json');
    });
    it('should not sign in a user when a wrong password is provided', async () => {
      const res = await request(app.getHttpServer())
        .post(loginEndpoint)
        .send({ email: 'johnmatthew@gmail.com', password: 'kh123456kjhf' });
      expect(res.status).toEqual(401);
      expect(res.type).toEqual('application/json');
    });
  });
});
