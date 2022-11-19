import { Router } from 'express';
import { handleErrors, handleInputErrors } from '../../middlewares';
import { login, signup } from './auth.controllers';
import { LoginInputValidator, SignUpInputValidator } from './auth.validators';

const authRouter = Router();

authRouter.post('/login', LoginInputValidator, handleInputErrors, login);
authRouter.post('/signup', SignUpInputValidator, handleInputErrors, signup);

// register error handler
authRouter.use(handleErrors);

export default authRouter;
