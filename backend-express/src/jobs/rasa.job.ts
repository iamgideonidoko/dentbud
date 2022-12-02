import cron from 'node-cron';
import { checkRasaHealth } from '../services/proxy.service';
import logger from '../config/logger.config';

export const pingRasa = () => {
  /* JOB */
  cron.schedule('0 */10 * * *', async () => {
    logger.info('Pinging Rasa for Health');
    await checkRasaHealth();
  });
};
