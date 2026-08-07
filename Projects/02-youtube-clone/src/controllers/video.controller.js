import mongoose from 'mongoose';
import cloudinary from '../config/cloudinary';
import VideoModel from '../models/video.model.js';

const uploadVideo = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;

    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({
        message: 'Video and thumbnail are required',
        success: false,
      });
    }

    const videoUpload = await cloudinary.uploader.upload(
      req.files.video.tempFilePath,
      {
        resource_type: 'video',
        folder: 'videos',
      }
    );

    const thumbnailUpload = await cloudinary.uploader.upload(
      req.files.thumbnail.tempFilePath,
      {
        folder: 'thumbnail',
      }
    );

    const video = await VideoModel.create({
      _id: mongoose.Schema.Types.ObjectId,
      title,
      description,
      user_id: req.user._id,
      videoUrl: videoUpload.secure_url,
      videoId: videoUpload.public_id,
      thumbnailUrl: thumbnailUpload.secure_url,
      thumbnailId: thumbnailUpload.public_id,
      category,
      tags: tags ? tags.split(',') : [],
    });

    return res.status(201).json({
      message: 'Video uploaded successfully',
      success: true,
      video,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

const updateVideo = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const videoId = req.params.id;

    const video = await VideoModel.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: 'Video not found',
        success: false,
      });
    }

    if (video.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Unauthorized',
        success: false,
      });
    }

    if (req.files && req.files.thumbnail) {
      await cloudinary.uploader.destroy(video.thumbnailId);

      const thumbnailUpload = await cloudinary.uploader.upload(
        req.files.thumbnail.tempFilePath,
        {
          folder: 'thumbnail',
        }
      );

      video.thumbnailUrl = thumbnailUpload.secure_url;
      video.thumbnailId = thumbnailUpload.public_id;
    }

    video.title = title ? title : video.title;
    video.description = description ? description : video.description;
    video.category = category ? category : video.category;
    video.tags = tags ? tags.split(',') : video.tags;
    await video.save();

    return res.status(200).json({
      message: 'Video updated successfully',
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

export { uploadVideo, updateVideo };
