import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

let app: INestApplication;
let moduleFixture: TestingModule;

beforeAll(async () => {
  moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await moduleFixture.close();
});

describe('User e2e tests', () => {
  const newUser = {
    firstName: 'john',
    lastName: 'matthew',
    email: 'johnmatthew@gmail.com',
    password: 'k12345kljd',
    address: 'no 3 ikorodu',
  };
  const newUser2 = {
    firstName: 'john',
    lastName: 'matthew',
    email: 'joshua@gmail.com',
    password: 'k12345kljd',
    address: 'no 3 ikorodu',
  };
  const newUser3 = {
    firstName: 'john',
    lastName: 'matthew',
    email: 'admin@gmail.com',
    password: 'k12345kljd',
    address: 'no 3 ikorodu',
  };
  const invalidData = {
    firstName: 45,
    lastName: 'matthew*-*',
    email: 'johnmatthewgmail.com',
    password: 'k123',
    address: '12****---',
  };

  describe('POST /api/v2/auth/signup', () => {
    it('should sign up a user', async () => {
      const res = await request(app.getHttpServer()).post('/auth/signup').send(newUser);
      expect(res.status).toEqual(201);
      expect(res.type).toEqual('application/json');
      expect(res.body.data).toHaveProperty('access_token');
    });
    it('should not sign up a user if user has an account with the specified email.', async () => {
      const res = await request(app.getHttpServer()).post('/auth/signup').send(newUser);
      expect(res.status).toEqual(409);
      expect(res.type).toEqual('application/json');
      expect(res.body).toHaveProperty('message');
    });
    it('should sign up a user', async () => {
      const res = await request(app.getHttpServer()).post('/auth/signup').send(newUser2);
      expect(res.status).toEqual(201);
      expect(res.type).toEqual('application/json');
      expect(res.body.data).toHaveProperty('access_token');
    });
    it('should not sign up a user if one or all the fields are missing', async () => {
      const res = await request(app.getHttpServer()).post('/auth/signup').send({});
      expect(res.status).toEqual(422);
      expect(res.type).toEqual('application/json');
      expect(res.body).toHaveProperty('message');
    });
    it('should sign up a user', async () => {
      const res = await request(app.getHttpServer()).post('/auth/signup').send(newUser3);
      expect(res.status).toEqual(201);
      expect(res.type).toEqual('application/json');
      expect(res.body.data).toHaveProperty('access_token');
    });
    it('should not sign up a user one or all the fields are invalid', async () => {
      const res = await request(app.getHttpServer()).post('/auth/signup').send(invalidData);
      expect(res.status).toEqual(422);
      expect(res.type).toEqual('application/json');
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('POST /api/v2/auth/login', () => {
    const admin = {
      email: 'johndoe@gmail.com',
      password: 'doe123456',
    };
    const user = {
      email: 'johnmatthew@gmail.com',
      password: 'k12345kljd',
    };
    it('should sign in a user', async () => {
      const res = await request(app.getHttpServer()).post('/auth/login').send(admin);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual('application/json');
      expect(res.body.data).toHaveProperty('access_token');
    });
    it('should sign in a user', async () => {
      const res = await request(app.getHttpServer()).post('/auth/login').send(user);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual('application/json');
      expect(res.body.data).toHaveProperty('access_token');
    });
    it('should sign in a user', async () => {
      const res = await request(app.getHttpServer()).post('/auth/login').send(user);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual('application/json');
      expect(res.body.data).toHaveProperty('access_token');
    });
    it('should not sign in a user when one or all fields are not provided', async () => {
      const res = await request(app.getHttpServer()).post('/auth/login').send({});
      expect(res.status).toEqual(422);
      expect(res.type).toEqual('application/json');
      expect(res.body).toHaveProperty('message');
    });
    it('should not sign in a user when a wrong email is provided', async () => {
      const res = await request(app.getHttpServer()).post('/auth/login').send({ email: 'thony@gmail.com', password: 'kh123456kjhf' });
      expect(res.status).toEqual(400);
      expect(res.type).toEqual('application/json');
    });
    it('should not sign in a user when a wrong password is provided', async () => {
      const res = await request(app.getHttpServer()).post('/auth/login').send({ email: 'johnmatthew@gmail.com', password: 'kh123456kjhf' });
      expect(res.status).toEqual(400);
      expect(res.type).toEqual('application/json');
    });
  });
});
