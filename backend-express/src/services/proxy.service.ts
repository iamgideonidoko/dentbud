import needle from 'needle';
import constants from '../config/constants.config';
import type { CallRasaRes } from '../interfaces/proxy.interface';

export const callRasa = (data: { sender: string; text: string }): Promise<CallRasaRes> => {
  return new Promise<CallRasaRes>((resolve, reject) => {
    needle.post(`${constants.rasaHost}/webhooks/dentbud/webhook`, data, { json: true }, (err, rasaRes) => {
      if (err) reject(err);
      resolve(rasaRes.body?.[0]);
    });
  });
};
