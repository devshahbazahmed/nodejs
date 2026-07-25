import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
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

    const hashPassword = await bcrypt.hash(password);

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
  } catch (error) {}
};

export { signupUser };
