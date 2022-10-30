import type { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { createSuccess } from '../helpers/http.helper';
import { callRasa } from '../services/proxy.service';

export const converseRasa = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, text } = req.body;
  if (!name || !email || !text) return next(createError(400, 'Please, enter all fields'));

  try {
    const rasaRes = await callRasa({ sender: email, text });
    console.log('rasaRes => ', rasaRes);
    const textToSend = rasaRes?.text;
    return createSuccess(res, 200, 'Dentbud responded successfully', {
      text: textToSend ?? `Sorry ${(name?.split(' ')?.[0] ?? '').trim()}, I can't provide a response at the moment.`,
    });
  } catch (err) {
    return next(err);
  }
};
