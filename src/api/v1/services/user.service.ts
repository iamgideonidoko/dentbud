import createError from 'http-errors';
import User from '../models/user.model';
import { NewUser } from '../interfaces/user.interface';
import { Response } from 'express';
import { hashPassword } from '../helpers/password.helper';
import { signPayload } from '../helpers/jwt.helper';

export const addUserToDb = async (res: Response, newUser: NewUser) => {
  const { name, email, password } = newUser;
  //Check for existing user in that model through password
  const user = await User.findOne({ email });
  if (user) {
    return createError(404, 'User already exists.');
    // return res.status(404).json({ message: 'User already exists.' });
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

      const token = await signPayload(id);

      return new Promise<>((resolve) =>
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
      throw err;
    }
  }
};
