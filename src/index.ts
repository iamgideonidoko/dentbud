/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction, Application, ErrorRequestHandler } from 'express';
import { Server } from 'http';
import createError from 'http-errors';
import { config } from 'dotenv';
import morgan from 'morgan';
import xss from 'xss-clean';
import AppError from './config/appError.config';
import globalErrorHandler from './api/v1/middlewares/globalErrorHandler.middleware';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import limiter from './config/rateLimiter.config';

config();

// boostrap the express application
const app: Application = express();

// for development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//  limit request payload size
app.use(express.json({ limit: '10kb' }));

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

// Routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('DentBud backend');
});

// Error for unhandled routes
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createError.NotFound());
});

// middleware for global error handling
app.use(globalErrorHandler);

// for unhandled routes
app.all('*', (req, res, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

const PORT: number = Number(process.env.PORT) || 5000;

const server: Server = app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
