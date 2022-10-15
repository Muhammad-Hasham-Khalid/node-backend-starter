import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import request from 'supertest';
import { config } from '../../config';
import { User } from '../../resources/user/user.model';
import { app } from '../../server';
import { setup } from '../../test-utils';
import { connect } from '../../utils/db';
import { signup } from '../controllers';

describe('signin()', () => {
  let user = {
    email: faker.internet.email(),
    name: faker.internet.userName(),
    password: faker.internet.password(),
  };

  beforeAll(async () => {
    await connect(config.MONGODB_URI);

    const { request, response } = setup();
    request.body = user;
    await signup(request, response);
  });

  it('should validate the response.body to have `email` and `password`', async () => {
    const response = await request(app).post('/signin').send();
    expect(response.status).toBe(400);
  });

  it('should throw error on wrong credentials', async () => {
    const response = await request(app).post('/signin').send({
      name: user.name,
      password: faker.internet.password(),
    });
    expect(response.status).toBe(400);
  });

  it('should return token and status 200 for valid credentials', async () => {
    const expectedResponse = {
      success: true,
      token: expect.any(String),
      message: expect.any(String),
    };

    const response = await request(app).post('/signin').send(user);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expectedResponse);
  });

  afterAll(async () => {
    await User.deleteOne({ email: user.email, name: user.name }).exec();
    await mongoose.disconnect();
  });
});
