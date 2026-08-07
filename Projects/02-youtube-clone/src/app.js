import express from 'express';
import fileUpload from 'express-fileupload';
import userRouter from './routes/user.routes.js';
import videoRouter from './routes/video.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './temp/',
  })
);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/video', videoRouter);

export default app;
