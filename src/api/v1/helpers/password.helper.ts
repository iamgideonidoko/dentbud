import bcrypt from 'bcryptjs';

const generateSalt = async (): Promise<string> => {
  const saltRounds = 10;

  return new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) reject(err);
      resolve(salt);
    });
  });
};

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await generateSalt();
    return new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  } catch (err) {
    throw err;
  }
};
