import { config } from 'dotenv';

config();

const constants = {
  mongodbURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
};

export default constants;
