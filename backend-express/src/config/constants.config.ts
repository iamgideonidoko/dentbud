import { config } from 'dotenv';
import type { Secret } from 'jsonwebtoken';

config();

type Constants = {
  mongodbURI: string;
  accessTokenSecret: Secret;
  refreshTokenSecret: Secret;
  accessTokenSpan: number | string;
  refreshTokenSpan: number | string;
  apiBase: string;
};

const constants: Constants = {
  mongodbURI: process.env.MONGODB_URI as string,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as Secret,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as Secret,
  // accessTokenSpan: '1d',
  accessTokenSpan: '1y',
  refreshTokenSpan: '1y',
  apiBase: '/api',
};

export default constants;
