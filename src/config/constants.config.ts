import { config } from 'dotenv';
import { Secret } from 'jsonwebtoken';

config();

type Constants = {
  mongodbURI: string;
  jwtSecret: Secret;
  jwtDuration: number;
};

const constants: Constants = {
  mongodbURI: process.env.MONGODB_URI as string,
  jwtSecret: process.env.JWT_SECRET as Secret,
  jwtDuration: 21600, // about 5 or 6hrs
};

export default constants;
