import express from 'express';
import morgan from 'morgan';
import authRoutes from './modules/auth/auth.routes';

export const app = express();

// global middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register routers
app.use('/auth', authRoutes);
