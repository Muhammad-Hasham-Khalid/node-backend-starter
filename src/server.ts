import express from 'express';
import { testController } from './modules/test/controllers';

export const app = express();

app.get('/', testController);
