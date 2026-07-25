import express from 'express';

const userRouter = express.Router();

userRouter.post('/signup', (req, res) => {
  res.json({ message: 'Hello there' });
});

export default userRouter;
