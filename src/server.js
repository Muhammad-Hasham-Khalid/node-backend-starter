import express from 'express';
import cors from 'cors';
// configs
import { config } from './config';
// utils
import { accessLogger, messageLogger } from './utils/loggers';
import { connect } from './utils/db';
// routers
import itemRouter from './resources/item/item.router';

export const app = express();

app.disable('x-powered-by');

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(accessLogger('dev'));

// routes
app.use('/api/item', itemRouter);

export const startServer = async () => {
  try {
    await connect();
    app.listen(config.PORT, () => {
      messageLogger.info(`Serving on http://localhost:${config.PORT}/api`);
    });
  } catch (e) {
    messageLogger.error(e);
  }
};
