import express, { Request, Response, NextFunction, Application } from 'express';
import createError from 'http-errors';
import { config } from 'dotenv';
import morgan from 'morgan';
import xss from 'xss-clean';
import globalErrorHandler from './api/v1/middlewares/globalErrorHandler.middleware';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import limiter from './config/rateLimiter.config';
import appCors from './config/cors.config';
import mongoose from 'mongoose';
import constants from './config/constants.config';
// Routes Import
import userRoute from './api/v1/routes/user.route';
import connectRedisClient from './config/redis.config';

// console.log('Client => ', client);

config();

(async () => {
  // connect to redis
  await connectRedisClient();
})();

// boostrap the express application
const app: Application = express();

// for development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//  limit request payload size
app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: false }));

// sanitize data against XSS
app.use(xss());

// compress stuff sent to the client
app.use(compression());

// parse cookies
app.use(cookieParser());

// add secure HTTP headers
app.use(helmet());

// register rate limiter
app.use(limiter());

// cors
app.use(appCors());

/* 
@description    MongoDB Connection using Mongoose ORM
*/
mongoose
  .connect(
    constants.mongodbURI /* , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  } */,
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log('MONGODB CONNECTION ERROR: ' + err));

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    name: 'DentBud Core',
    description: 'Core service for DentBud, an AI-powered mobile assistant for students.',
  });
});

app.get(constants.v1Base, (_req: Request, res: Response) => {
  res.status(200).json({
    name: 'DentBud Core v1',
    description: 'Core service (v1) for DentBud, an AI-powered mobile assistant for students.',
    version: 'v1',
  });
});

app.use(constants.v1Base, userRoute);

// Error for unhandled routes
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createError.NotFound());
});

// middleware for global error handling
app.use(globalErrorHandler);

// get the unhandled rejection and throw it to another fallback handler we already have.
process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
process.on('uncaughtException', (error: Error) => {
  console.log('UncaughtException Error => ', error);
  process.exit(1);
});

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
