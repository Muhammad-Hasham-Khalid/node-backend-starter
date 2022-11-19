type MakeHttpErrorArgs = {
  statusCode: number;
  errorMessage: string;
};

export function makeHttpError({ statusCode, errorMessage }: MakeHttpErrorArgs) {
  return {
    headers: {
      'Content-Type': 'application/json' as const,
    },
    statusCode,
    data: JSON.stringify({
      success: false,
      error: errorMessage,
    }),
  };
}
