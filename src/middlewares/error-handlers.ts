import { NextFunction, Response, Request } from 'express';
import { validationResult } from 'express-validator';

export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    return res.json({ errors: errors.mapped() });
  }

  return next();
};

export const handleErrors = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.status(500).json({ message: 'Something Went Wrong' });
};
