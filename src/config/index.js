import dotenv from 'dotenv';
import { messageLogger } from '../utils/loggers';

function loadEnv () {
  if (process.env.NODE_ENV === 'development') {
    const loadedEnv = dotenv.config();
    if (loadedEnv.error) {
      messageLogger.error(loadedEnv.error);
    } else {
      messageLogger.success('loaded env successfully.');
    }
    return loadedEnv.error ? {} : loadedEnv.parsed
  }
  return process.env;
}



export const config = loadEnv();
