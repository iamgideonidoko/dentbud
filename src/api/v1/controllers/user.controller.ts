import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
// import { createSuccess } from '../helpers/http.helper';

export const registerUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, retype_password } = req.body;

  //check if all input fields have value
  if (!name || !email || !password || !retype_password) {
    return next(createError(400, 'Please, enter all fields'));
    // return createSuccess(res, 200, 'User created');
  }

  if (password !== retype_password) {
    return res.status(400).json({ message: 'Passwords must be same.' });
  }

  res.status(201).json({ message: 'succeed' });
};
