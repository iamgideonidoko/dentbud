import createError from 'http-errors';
import User from '../models/user.model';
import { NewUser, RegisterReturn } from '../interfaces/user.interface';
import { hashPassword } from '../helpers/password.helper';
import { signAccessToken } from '../helpers/jwt.helper';
import { NextFunction } from 'express';

export const addUserToDb = async (next: NextFunction, newUser: NewUser): Promise<RegisterReturn | void> => {
  const { name, email, password } = newUser;
  //Check for existing user in that model through password
  const user = await User.findOne({ email });
  if (user) {
    throw createError(406, 'User already exists');
    // return next(createError(406, 'User already exists'));
  } else {
    //create new user from the model
    const newUser = new User({
      name,
      email,
      password,
    });

    try {
      const hashedPassword = await hashPassword(newUser.password);
      newUser.password = hashedPassword;
      const savedUser = await newUser.save();
      const { id, name, email, created_at } = savedUser;

      const token = await signAccessToken(id);

      return new Promise<RegisterReturn>((resolve) =>
        resolve({
          token,
          user: {
            id,
            name,
            email,
            created_at,
          },
        }),
      );
    } catch (err) {
      // return next(err);
      throw err;
    }
  }
};
