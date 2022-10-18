import type { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { delRefreshToken, getNewTokens, getUserFromDb } from '../services/auth.service';
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

export const refreshUserToken = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;

  //check if all input fields have value
  if (!refreshToken) {
    return next(createError(400, 'Please, enter all fields'));
  }

  try {
    const tokens = await getNewTokens(refreshToken);
    if (tokens) {
      return createSuccess(res, 200, 'Token refreshed successfully', tokens);
    }
  } catch (err) {
    return next(err);
  }
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;

  //check if all input fields have value
  if (!refreshToken) {
    return next(createError(400, 'Please, enter all fields'));
  }

  try {
    const value = await delRefreshToken(refreshToken);
    if (value) {
      return createSuccess(res, 200, 'User logged out successfully', value);
    }
  } catch (err) {
    return next(err);
  }
};
