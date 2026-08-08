import mongoose from 'mongoose';
import cloudinary from '../config/cloudinary.js';
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

const getAllVideos = async (req, res) => {
  try {
    const videos = await VideoModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: 'All videos fetched successfully',
      success: true,
      videos,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

const getMyVideos = async (req, res) => {
  try {
    const myVideos = await VideoModel.findById({ user_id: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      message: 'My videos fetched successfully',
      success: true,
      myVideos,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

const getVideoById = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const video = await VideoModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { viewedBy: userId },
      },
      { new: true }
    );

    if (!video)
      return res.status(200).json({
        message: 'Video fetched successfully',
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

const getVideoByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const videoByCategory = await VideoModel.find({ category }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      message: 'Video by category fetched successfully',
      success: true,
      videoByCategory,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

const getVideoByTags = async (req, res) => {
  try {
    const tag = req.params.tag;
    const videoByTag = await VideoModel.find({ tags: tag }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      message: 'Video by tags fetched successfully',
      success: true,
      videoByTag,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

const likeVideo = async (req, res) => {
  try {
    const videoId = req.body.videoId;

    const likedVideo = await VideoModel.findByIdAndUpdate(videoId, {
      $addToSet: { likedBy: req.user._id },
      $pull: { dislikedBy: req.user._id },
    });

    return res.status(200).json({
      message: 'Liked the video',
      success: true,
      likeVideo,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

const dislikeVideo = async (req, res) => {
  try {
    const videoId = req.body.videoId;
    const dislikedVideo = await VideoModel.findByIdAndUpdate(videoId, {
      $addToSet: { dislikedBy: req.user._id },
      $pull: { likedBy: req.user._id },
    });

    return res.status(200).json({
      message: 'Disliked the video',
      success: true,
      dislikedVideo,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

export {
  uploadVideo,
  updateVideo,
  getAllVideos,
  getMyVideos,
  getVideoById,
  getVideoByCategory,
  getVideoByTags,
  likeVideo,
  dislikeVideo,
};
