interface MakeHttpResponseArgs {
  statusCode: number;
  data: any;
  [x: string]: any;
}

export function makeHttpResponse({
  statusCode = 200,
  data,
  ...args
}: MakeHttpResponseArgs) {
  return {
    headers: {
      'Content-Type': 'application/json' as const,
    },
    statusCode,
    data: JSON.stringify({
      success: true,
      data,
      ...args,
    }),
  };
}
