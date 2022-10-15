import { connect } from '../db';
import mongoose from 'mongoose';
import { config } from '../../config';

test('connect() should connect to database', async () => {
  const connected = await connect(config.MONGODB_URI);
  expect(connected).toBe(true);
});

afterEach(async () => {
  await mongoose.disconnect();
});
