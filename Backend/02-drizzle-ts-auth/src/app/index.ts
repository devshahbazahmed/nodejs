import express from 'express';
import type { Express } from 'express';
import { authenticationMiddleware } from './middleware/auth.middleware.js';
import { authRouter } from './auth/routes.js';

export function createApplicationServer(): Express {
  const app = express();

  app.use(express.json());
  app.use(authenticationMiddleware());

  app.use('/api/auth', authRouter);

  app.get('/', (_, res) => {
    return res.status(200).json({
      message: 'Server started running',
    });
  });

  return app;
}
