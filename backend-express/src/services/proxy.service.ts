import needle from 'needle';
import constants from '../config/constants.config';
import type { CallRasaRes } from '../interfaces/proxy.interface';
import logger from '../config/logger.config';
import googleIt from 'google-it';

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

export const replaceNamePlaceholder = (text: string, replacer: string): Promise<string> => {
  return new Promise<string>((resolve) => {
    resolve(text.replace('{{name}}', replacer));
  });
};

export const processText = (text: string, initText: string): Promise<string> => {
  return new Promise<string>(async (resolve) => {
    let resText = ``;
    if (text.includes('[[NLU_FALLBACK]]')) {
      try {
        const googleRes = (await googleIt({ query: initText, limit: 1, 'no-display': true })) as Array<{
          title: string;
          link: string;
          snippet: string;
        }>;
        console.log('Google Result => ', googleRes);
        // send if there is a valid response from google
        resText = googleRes[0]?.snippet
          ? `${googleRes[0]?.snippet}
        [Read more](${googleRes[0]?.link})`
          : '';
      } catch (err) {
        console.log('Google it error: ', err);
      }
    } else if (text.includes('[[SEND_ALL_TASKS]]')) {
    } else if (text.includes('[[SEND_ALL_COURSES]]')) {
    } else {
      resText = text;
    }
    resolve(resText);
  });
};

export const checkRasaHealth = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    needle.get(`${constants.rasaHost}/`, (err) => {
      if (err) logger.error('RASA HEALTH: BAD');
      logger.success('RASA HEALTH: OK');
      resolve();
    });
  });
};
