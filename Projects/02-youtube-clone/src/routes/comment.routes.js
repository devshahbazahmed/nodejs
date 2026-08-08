import express from 'express';
import { checkAuth } from '../middleware/auth.middleware.js';
import * as commentController from '../controllers/comment.controller.js';

const commentRouter = express.Router();

commentRouter.post('/add', checkAuth, commentController.newComment);

commentRouter.delete('/delete/:id', checkAuth, commentController.deleteComment);

commentRouter.put('/update/:id', checkAuth, commentController.updateComment);

commentRouter.get('/:videoId', checkAuth, commentController.getComment);

export default commentRouter;
