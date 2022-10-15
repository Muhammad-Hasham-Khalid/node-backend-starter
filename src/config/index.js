import dotenv from 'dotenv';
import path from 'path';
import { messageLogger } from '../utils/loggers';

const environment = {
  production: '.env.production',
  development: '.env.development',
  testing: '.env.testing',
};

function loadEnv() {
  const envFile = environment[process.env.APP_ENV] ?? '.env';

  const loadedEnv = dotenv.config({
    path: path.join(__dirname, '..', '..', envFile),
  });

  if (loadedEnv.error) {
    messageLogger.error(loadedEnv.error);
  } else {
    messageLogger.success(`loaded ${envFile} successfully.`);
  }
  return loadedEnv.error ? process.env : loadedEnv.parsed;
}

export const config = loadEnv();
