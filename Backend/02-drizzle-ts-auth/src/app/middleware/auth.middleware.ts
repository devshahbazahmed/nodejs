import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../auth/utils/token.js';

export function authenticationMiddleware() {
  return function (req: Request, res: Response, next: NextFunction) {
    const header = req.headers['authorization'];

    if (!header) next();

    if (!header?.startsWith('Bearer')) {
      return res.status(400).json({
        message: 'authorization header must start with Bearer',
      });
    }

    const token = header.split(' ')[1];

    if (!token) {
      return res.status(400).json({
        message:
          'authorization header must start with Bearer and followed by token',
      });
    }

    const user = verifyToken(token);
    // @ts-ignore
    req.user = user;
    next();
  };
}

export function restrictToAuthenticatedUser() {
  return function (req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    return next();
  };
}
