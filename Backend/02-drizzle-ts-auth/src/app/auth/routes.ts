import express from 'express';
import type { Router } from 'express';
import AuthenticationController from './controller.js';
import { restrictToAuthenticatedUser } from '../middleware/auth.middleware.js';

const controller = new AuthenticationController();

export const authRouter: Router = express.Router();

authRouter.post('/signup', controller.handleSignup.bind(controller));

authRouter.post('/signin', controller.handleSignin.bind(controller));

authRouter.get(
  '/me',
  restrictToAuthenticatedUser(),
  controller.handleMe.bind(controller)
);
