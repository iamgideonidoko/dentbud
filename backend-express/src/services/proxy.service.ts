import needle from 'needle';
import constants from '../config/constants.config';
import type { CallRasaRes } from '../interfaces/proxy.interface';

export const callRasa = (data: { sender: string; text: string }): Promise<CallRasaRes> => {
  return new Promise<CallRasaRes>((resolve, reject) => {
    console.log('data input => ', data);
    needle.post(`${constants.rasaHost}/webhooks/dentbud/webhook`, data, { json: true }, (err, rasaRes) => {
      if (err) reject(err);
      console.log('response body => ', rasaRes.body);
      resolve(rasaRes.body?.[0]);
    });
  });
};

export const processText = (text: string): Promise<string> => {
  return new Promise<string>((resolve) => {
    resolve(text);
  });
};
