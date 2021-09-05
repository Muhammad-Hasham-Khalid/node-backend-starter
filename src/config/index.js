import dotenv from 'dotenv';
import { messageLogger } from '../utils/loggers';

const loadedEnv = dotenv.config();
if (loadedEnv.error) {
  messageLogger.error(loadedEnv.error);
} else {
  messageLogger.success('loaded env successfully.');
}

export const config = loadedEnv.error ? {} : loadedEnv.parsed;
