import dotenv from 'dotenv';
import path from 'path';
import { messageLogger } from '../utils/loggers';

const environment = {
  production: 'production',
  development: 'development',
  testing: 'testing',
};

function loadEnv() {
  const envFile = `.env.${environment[process.env.APP_ENV] ?? ''}`;
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
