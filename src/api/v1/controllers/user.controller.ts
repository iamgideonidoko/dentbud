import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { addUserToDb } from '../services/user.service';
import { createSuccess } from '../helpers/http.helper';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, retype_password } = req.body;

  //check if all input fields have value
  if (!name || !email || !password || !retype_password) {
    return next(createError(400, 'Please, enter all fields'));
    // return createSuccess(res, 200, 'User created');
  }

  if (password !== retype_password) {
    return next(createError(400, 'Passwords must be same'));
  }

  const registeredUser = await addUserToDb(next, req.body);

  if (registeredUser) {
    return createSuccess(res, 200, 'User registered successfully', { user: registeredUser });
  }
};
