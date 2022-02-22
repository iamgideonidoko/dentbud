import jwt, { JwtPayload } from 'jsonwebtoken';
import constants from '../../../config/constants.config';

/*  */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signAccessToken = async (payload: string | object | Buffer): Promise<string | undefined> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, constants.accessTokenSecret, { expiresIn: constants.accessTokenSpan }, (err, token) => {
      if (err) reject(err);
      resolve(token as string);
    });
  });
};

export const signRefreshToken = async (payload: string | object | Buffer): Promise<string | undefined> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, constants.refreshTokenSecret, { expiresIn: constants.accessTokenSpan }, (err, token) => {
      if (err) reject(err);
      resolve(token as string);
    });
  });
};

export const verifyAccessToken = async (accessToken: string): Promise<string | JwtPayload | undefined> => {
  return new Promise<string | JwtPayload | undefined>((resolve, reject) => {
    jwt.verify(accessToken, constants.accessTokenSecret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};

export const verifyRefreshToken = async (refreshToken: string): Promise<string | JwtPayload | undefined> => {
  return new Promise<string | JwtPayload | undefined>((resolve, reject) => {
    jwt.verify(refreshToken, constants.refreshTokenSecret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};
