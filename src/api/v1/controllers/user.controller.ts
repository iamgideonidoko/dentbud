import { Request, Response } from 'express';

export const registerUser = (req: Request, res: Response) => {
  const { name, email, password, retype_password } = req.body;

  //check if all input fields have value
  if (!name || !email || !password || !retype_password) {
    return res.status(400).json({ message: 'Please, enter all fields.' });
  }

  if (password !== retype_password) {
    return res.status(400).json({ message: 'Passwords must be same.' });
  }

  res.status(201).json({ message: 'succeed' });
};
