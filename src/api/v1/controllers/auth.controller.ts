import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { getUserFromDb } from '../services/auth.service';
import { createSuccess } from '../helpers/http.helper';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  //check if all input fields have value
  if (!email || !password) {
    return next(createError(400, 'Please, enter all fields'));
    // return createSuccess(res, 200, 'User created');
  }

  try {
    const loggedInUser = await getUserFromDb(email, password);
    if (loggedInUser) {
      return createSuccess(res, 200, 'User logged in successfully', { user: loggedInUser });
    }
  } catch (err) {
    return next(err);
  }
};
