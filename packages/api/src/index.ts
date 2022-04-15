// Imports
// ========================================================
import 'express-async-errors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Routes from './routes';
import { buildErrorResponse } from './utils/helpers';
import { BadRequest, Forbidden, NotFound } from './utils/errorHandlers';
import { Prisma } from '@prisma/client';

// ENV VARS
// ========================================================
dotenv.config();

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const VERSION: string = process.env.VERSION || 'unknown';

// Init
// ========================================================
const app = express();

// Middlewares
// ========================================================
app.use(cors());
app.use(helmet());
app.use(express.json());

// Endpoints / Routes
// ========================================================
/**
 *
 */
app.get('/', (_req, res) =>
  res.send({ version: VERSION, environment: NODE_ENV }),
);

/**
 *
 */
app.get('/healthz', (_req, res) => res.send({ status: 'ok' }));

/**
 *
 */
app.use('/api', Routes);

// Error Handler
// ========================================================
app.use((error: any, _req: Request, res: Response, next: NextFunction) => {
  if (
    error instanceof BadRequest ||
    error instanceof Forbidden ||
    error instanceof NotFound
  ) {
    return res
      .status(error?.httpStatusCode ?? 400)
      .json(
        buildErrorResponse({ message: error?.message ?? 'Unknown error.' }),
      );
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    return res.status(400).json(
      buildErrorResponse({
        message: error?.message ?? 'Unknown database error.',
      }),
    );
  }
  next(error);
});

// Exprots
// ========================================================
export default app;
