import { config } from 'dotenv';
import { Secret } from 'jsonwebtoken';

config();

type Constants = {
  mongodbURI: string;
  jwtSecret: Secret;
  jwtDuration: number;
  v1Base: string;
};

const constants: Constants = {
  mongodbURI: process.env.MONGODB_URI as string,
  jwtSecret: process.env.JWT_SECRET as Secret,
  jwtDuration: 21600, // about 5 or 6hrs
  v1Base: '/api/v1',
};

export default constants;
