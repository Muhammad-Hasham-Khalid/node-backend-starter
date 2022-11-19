import { createHandler, makeHttpError, makeHttpResponse } from '../../utils';
import { AuthService } from './auth.service';

/*
 You can either use createHandler() function to create controllers/handlers then makeHttpResponse() and makeHttpError() can be used to do the heavy lifting of server error handling and response/error formatting for you or you can write a controller function directly and register it in the [module].routes.ts file.

 The benefit of using createHandler(), makeHttpResponse(), makeHttpError() will be consistent output of the API.

 For testing: the createHandler() function can be mocked to pass custom request and next params and test the output based on that.
 */

export const login = createHandler(async (request, _next) => {
  try {
    const data = await AuthService.login(request.body);
    return makeHttpResponse({ statusCode: 200, data });
  } catch (error) {
    return makeHttpError({ statusCode: 404, errorMessage: error.message });
  }
});

export const signup = createHandler((request) => {
  return makeHttpResponse({
    statusCode: 200,
    data: request.body,
    message: 'some useful message', // extra properties can be added in case of need
  });
});
