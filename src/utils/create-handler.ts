import { NextFunction, Request, Response } from 'express';
import { makeHttpError } from './http-error';
import { adaptHttpRequest, HttpRequest } from './http-request';
import { makeHttpResponse } from './http-response';

export function createHandler(
  handlerFunc: (
    req: HttpRequest,
    next: NextFunction
  ) =>
    | Promise<ReturnType<typeof makeHttpResponse>>
    | Promise<ReturnType<typeof makeHttpError>>
    | ReturnType<typeof makeHttpResponse>
    | ReturnType<typeof makeHttpError>
    | void
) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const httpRequest = adaptHttpRequest(request);

    try {
      const handledResponse = await handlerFunc(httpRequest, next);

      if (handledResponse) {
        const { data, headers, statusCode } = handledResponse;
        return response.set(headers).status(statusCode).send(data);
      }
    } catch (error) {
      return response
        .status(500)
        .send({ error: error?.message ?? 'something went wrong' });
    }

    return;
  };
}
