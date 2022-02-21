import { config } from 'dotenv';
import { Secret } from 'jsonwebtoken';

config();

type Constants = {
  mongodbURI: string;
  accessTokenSecret: Secret;
  refreshTokenSecret: Secret;
  tokenSpan: number | string;
  refreshTokenSpan: number | string;
  v1Base: string;
};

const constants: Constants = {
  mongodbURI: process.env.MONGODB_URI as string,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as Secret,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as Secret,
  tokenSpan: '5h',
  refreshTokenSpan: '1y',
  v1Base: '/api/v1',
};

export default constants;
