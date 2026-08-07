import express from 'express';
import * as videoController from '../controllers/video.controller.js';
import { checkAuth } from '../middleware/auth.middleware.js';

const videoRouter = express.Router();

videoRouter.post('/upload', checkAuth, videoController.uploadVideo);

videoRouter.put('/update/:id', checkAuth, videoController.updateVideo);

export default videoRouter;
