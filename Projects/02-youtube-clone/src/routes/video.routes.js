import express from 'express';
import * as videoController from '../controllers/video.controller.js';
import { checkAuth } from '../middleware/auth.middleware.js';

const videoRouter = express.Router();

videoRouter.post('/upload', checkAuth, videoController.uploadVideo);

videoRouter.put('/update/:id', checkAuth, videoController.updateVideo);

videoRouter.get('/all', videoController.getAllVideos);

videoRouter.get('/my-videos', checkAuth, videoController.getMyVideos);

videoRouter.get('/:id', checkAuth, videoController.getVideoById);

videoRouter.get(
  '/category/:category',
  checkAuth,
  videoController.getVideoByCategory
);

videoRouter.get('/tags/:tag', checkAuth, videoController.getVideoByTags);

export default videoRouter;
