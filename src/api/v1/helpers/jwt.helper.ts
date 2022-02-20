import jwt from 'jsonwebtoken';
import constants from '../../../config/constants.config';

/*  */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signPayload = async (payload: string | object | Buffer): Promise<string | undefined> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, constants.jwtSecret, { expiresIn: constants.jwtDuration }, (err, token) => {
      if (err) reject(err);
      resolve(token as string);
    });
  });
};
