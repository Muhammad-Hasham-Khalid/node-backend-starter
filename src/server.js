import express from 'express';
import cors from 'cors';
// configs
import { config } from './config';
// utils
import { accessLogger, messageLogger } from './utils/loggers';
import { connect } from './utils/db';
import { authenticate } from './auth/middleware';
// routers
import { signin, signup } from './auth/controllers';
import itemRouter from './resources/item/item.router';

export const app = express();

app.disable('x-powered-by');

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(accessLogger('dev'));

// authentication
app.post('/signup', signup);
app.post('/signin', signin);
app.use('/api', authenticate);

// routes
app.use('/api/item', itemRouter);

export const startServer = async () => {
  try {
    const connected = await connect();
    if (!connected) throw new Error('DB not connected');
    app.listen(config.PORT, () => {
      messageLogger.info(`Serving on http://localhost:${config.PORT}/api`);
    });
  } catch (e) {
    messageLogger.error(e);
  }
};
