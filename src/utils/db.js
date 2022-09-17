import mongoose from 'mongoose';
import { config } from '../config';
import { messageLogger } from './loggers';

export const connect = async (url = config.MONGODB_URI, opts = {}) => {
  try {
    await mongoose.connect(url, { ...opts, useNewUrlParser: true });
    return true;
  } catch (error) {
    messageLogger.error(error);
    return false;
  }
};
