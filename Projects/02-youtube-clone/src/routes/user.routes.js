import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { checkAuth } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/signup', userController.signupUser);

userRouter.post('/login', userController.loginUser);

userRouter.put('/update-profile', checkAuth, userController.updateUserProfile);

userRouter.post('/subscribe', checkAuth, userController.subscribeChannel);

export default userRouter;
