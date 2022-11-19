import { Request } from 'express';

export function adaptHttpRequest(req: Request) {
  let adaptedRequest = {
    path: req.path,
    method: req.method,
    params: req.params,
    query: req.query,
    body: req.body,
    user: (req as any).user ?? null,
  };

  return Object.freeze(adaptedRequest);
}

export type HttpRequest = ReturnType<typeof adaptHttpRequest>;
