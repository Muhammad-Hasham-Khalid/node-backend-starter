import { User, userValidationSchema } from '../resources/user/user.model';
import { messageLogger } from '../utils/loggers';
import { generateToken } from './utils';

export const signin = async (request, response) => {
  if (!request.body.email || !request.body.password) {
    return response.status(400).json({
      success: false,
      message: '`email` and `password` are required',
    });
  }

  const invalidCredentials = 'invalid email and password combination';
  try {
    const foundUser = await User.findOne({ email: request.body.email }).exec();
    if (!foundUser) {
      return response.status(400).json({
        success: false,
        message: invalidCredentials,
      });
    }
    const match = await foundUser.checkPassword(request.body.password);

    if (!match) {
      return response.status(400).json({
        success: false,
        message: invalidCredentials,
      });
    }

    const token = await generateToken(foundUser);
    return response.status(200).json({
      success: true,
      token,
      message: 'user found successfully',
    });
  } catch (exception) {
    messageLogger.error(exception.message);
    return response.status(500).end();
  }
};

export const signup = async (request, response) => {
  const { value, error } = userValidationSchema.validate(request.body);
  if (error)
    return response
      .status(400)
      .json({ success: false, message: error.message });

  try {
    const user = await User.create(value);
    const token = await generateToken(user);
    return response
      .status(201)
      .json({ success: true, token, message: 'user created successfully' });
  } catch (exception) {
    messageLogger.error(exception.message);
    return response.status(500).end();
  }
};
