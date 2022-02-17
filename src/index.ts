/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction, Application, ErrorRequestHandler } from 'express';
import { Server } from 'http';
import createHttpError from 'http-errors';
import { config } from 'dotenv';
import morgan from 'morgan';
import xss from 'xss-clean';

config();

// boostrap the express application
const app: Application = express();

// for development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// sanitize data against XSS
app.use(xss());

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

app.use(errorHandler);

// Routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello from DentBud backend');
});

const PORT: number = Number(process.env.PORT) || 5000;

const server: Server = app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
