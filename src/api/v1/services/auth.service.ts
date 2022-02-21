import createError from 'http-errors';
import User from '../models/user.model';
import { RegisterReturn } from '../interfaces/user.interface';
import { validatePassword } from '../helpers/password.helper';
import { signAccessToken } from '../helpers/jwt.helper';

export const getUserFromDb = async (userEmail: string, userPassword: string): Promise<RegisterReturn | void> => {
  //Check for existing user in that model through password
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new createError.NotFound('User does not exist');
  } else {
    const { id, name, email, password, created_at } = user;

    try {
      const match = await validatePassword(userPassword, password);

      if (match) {
        const accessToken = await signAccessToken({ id });
        return new Promise<RegisterReturn>((resolve) =>
          resolve({
            accessToken,
            user: {
              id,
              name,
              email,
              created_at,
            },
          }),
        );
      } else {
        throw createError(401, 'Incorrect password');
      }
    } catch (err) {
      throw err;
    }
  }
};
