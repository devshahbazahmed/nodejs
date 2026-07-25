import 'dotenv/config';
import express from 'express';
import app from './src/app.js';
import connectToDB from './src/config/db.config.js';

const PORT = process.env.PORT || 8080;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to Database');
    process.exit(1);
  });
