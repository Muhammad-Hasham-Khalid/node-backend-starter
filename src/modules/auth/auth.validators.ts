import { body } from 'express-validator';

export const LoginInputValidator = [
  body('username').exists().isString(),
  body('password').exists().isString(),
];

export const SignUpInputValidator = [
  body('username').exists().isString(),
  body('password').exists().isString(),
];
