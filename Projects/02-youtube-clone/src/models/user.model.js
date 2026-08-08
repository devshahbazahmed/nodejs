import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: [true, 'Channel Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone details is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    logoUrl: {
      type: String,
      required: [true, 'Logo URL is required'],
    },
    logoId: {
      type: String,
      required: [true, 'Logo ID is required'],
    },
    subscribedChannels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('subscribers').get(function () {
  return this.subscribedChannels.length;
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
