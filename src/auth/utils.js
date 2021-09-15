import { config } from '../config';
import jwt from 'jsonwebtoken';

export const generateToken = user => {
  return new Promise((resolve, reject) =>
    jwt.sign(
      { id: user.id },
      config.JWT_SECRET,
      {
        expiresIn: '30d',
      },
      (error, token) => {
        if (error) return reject(error);
        resolve(token);
      }
    )
  );
};

export const verifyToken = token => {
  return new Promise((resolve, reject) =>
    jwt.verify(token, config.JWT_SECRET, (error, payload) => {
      if (error) return reject(error);
      resolve(payload);
    })
  );
};
