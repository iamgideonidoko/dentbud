import createError from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import constants from '../../../config/constants.config';

interface AuthReq extends Request {
  user: string | JwtPayload;
}

const auth = (req: AuthReq, _res: Response, next: NextFunction): void => {
  // get the token from the request header
  const token = req.header('Authorization');

  // check if token is available
  if (!token) return next(createError(401, 'No token, authorisation denied.'));

  try {
    //if there is a token, then verify
    const decoded = jwt.verify(token, constants.accessTokenSecret);

    //add the user from payload
    req.user = decoded;
    console.log('Decoded token: => ', decoded);

    next();
  } catch (e) {
    return next(createError('Token is not valid'));
  }
};

export default auth;
