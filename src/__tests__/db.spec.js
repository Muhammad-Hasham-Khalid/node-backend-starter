import { connect } from '../utils/db';
import mongoose from 'mongoose';

describe('DB', () => {
  test('connect() should connect to database', async () => {
    const connected = await connect('mongodb://localhost:27017/testdb');
    expect(connected).toBe(true);
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });
});
