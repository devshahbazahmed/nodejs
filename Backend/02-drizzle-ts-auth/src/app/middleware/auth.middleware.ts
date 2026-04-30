import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../auth/utils/token.js';

export function authenticationMiddleware() {
  return function (req: Request, res: Response, next: NextFunction) {
    const header = req.headers['authorization'];

    if (!header) return next();

    if (!header?.startsWith('Bearer')) {
      return res.status(400).json({
        message: 'Authoriztion header must start with Bearer',
      });
    }

    const token = header.split(' ')[1];

    if (!token) {
      return res.status(400).json({
        message:
          'Authorization header must start with Bearer along with the token',
      });
    }

    const user = verifyToken(token);

    // @ts-ignore
    req.user = user;
    return next();
  };
}

export function restrictToAuthenticatedUser() {
  return function (req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    if (!req.user) {
      return res.status(401).json({
        message: 'User is not authenticated',
      });
    }
    return next();
  };
}
