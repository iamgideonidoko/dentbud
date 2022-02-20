import { Response } from 'express';

export const createSuccess = (res: Response, statusCode = 200, message: string): Response => {
  return res.status(statusCode).json({ status: 'success', statusCode, message });
};
