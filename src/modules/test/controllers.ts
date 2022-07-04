import { Request, Response } from 'express';

export const testController = (_request: Request, response: Response) => {
  response.send({ data: 'transport optimization service' });
};
