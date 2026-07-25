import mongoose from 'mongoose';
import 'dotenv/config';

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database Connected ✅');
  } catch (error) {
    console.log(error.message);
    throw new Error('Something went wrong', error);
  }
};

export default connectToDB;
