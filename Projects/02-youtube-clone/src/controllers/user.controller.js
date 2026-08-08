import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';
import UserModel from '../models/user.model.js';

const signupUser = async (req, res) => {
  try {
    const { email, password, phone, channelName } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email already exists',
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const uploadImage = await cloudinary.uploader.upload(
      req.files.logoUrl.tempFilePath
    );

    const newUser = await UserModel.create({
      channelName,
      email,
      password: hashPassword,
      phone,
      logoUrl: uploadImage.secure_url,
      logoId: uploadImage.public_id,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        channelName: existingUser.channelName,
        email: existingUser.email,
        phone: existingUser.phone,
        logoId: existingUser.logoId,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'User logged in successfully',
      success: true,
      data: {
        id: existingUser._id,
        channelName: existingUser.channelName,
        email: existingUser.email,
        phone: existingUser.phone,
        logoId: existingUser.logoId,
        token: token,
        subscribers: existingUser.subscribers,
        subscribedChannels: existingUser.subscribedChannels,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { channelName, phone } = req.body;
    let updatedData = { channelName, name };

    if (req.files && req.files.logoUrl) {
      const updatedLogoUrl = await cloudinary.uploader.upload(
        req.files.logoUrl.tempFilePath
      );
      updatedData.logoUrl = updatedLogoUrl.secure_url;
      updatedData.logoId = updatedLogoUrl.public_id;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      updatedData,
      { new: true }
    );

    return res.status(200).json({
      message: 'User profile updated successfully',
      success: true,
      updatedData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

const subscribeChannel = async (req, res) => {
  try {
    const { channelId } = req.body;

    if (req.user._id === channelId) {
      return res.status(400).json({
        message: 'You cannot subscribe to yourself',
        success: false,
      });
    }

    const currentUser = await UserModel.findByIdAndUpdate(req.user._id, {
      $addToSet: { subscribedChannels: channelId },
    });

    const subscribedUser = await UserModel.findByIdAndUpdate(channelId, {
      $inc: { subscribers: 1 },
    });

    return res.status(200).json({
      message: 'Subscribed successfully',
      success: true,
      data: { currentUser, subscribedUser },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

export { signupUser, loginUser, updateUserProfile, subscribeChannel };
