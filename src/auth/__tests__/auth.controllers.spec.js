import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import request from 'supertest';
import { config } from '../../config';
import { User } from '../../resources/user/user.model';
import { app } from '../../server';
import { connect } from '../../utils/db';

describe('signin()', () => {
  let user = {
    email: faker.internet.email(),
    name: faker.internet.userName(),
    password: faker.internet.password(),
  };

  beforeAll(async () => {
    await connect(config.MONGODB_URI);
    await User.create(user);
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

describe('signup()', () => {
  const testUsers = [];
  beforeAll(async () => {
    await connect(config.MONGODB_URI);
  });

  it('should validate the response.body to have `name`, `email`, `password`', async () => {
    const response = await request(app).post('/signup').send();
    expect(response.status).toBe(400);
  });

  it('should create a new user and return token', async () => {
    let user = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
    };

    const response = await request(app).post('/signup').send(user);
    const expectedResponse = {
      success: true,
      token: expect.any(String),
      message: expect.any(String),
    };

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(expectedResponse);

    testUsers.push(user);
  });

  afterAll(async () => {
    const deletions = testUsers.map(user =>
      User.deleteOne({ name: user.name, email: user.email }).exec()
    );

    await Promise.all(deletions);
    await mongoose.disconnect();
  });
});
