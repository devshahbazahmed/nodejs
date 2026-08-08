import CommentModel from '../models/comment.model.js';

const newComment = async (req, res) => {
  try {
    const { videoId, commentText } = req.body;
    if (!videoId || commentText) {
      return res.status(400).json({
        message: 'Video ID and comment text are required',
        success: false,
      });
    }
    const newComment = await CommentModel.create({
      video_id,
      user_id: req.user._id,
      commentText,
    });

    return res.status(201).json({
      message: 'Comment added successfully',
      success: true,
      newComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const videoId = req.body.videoId;

    const comment = await CommentModel.findById(id);

    if (!comment)
      return res.status(404).json({
        message: 'Comment not found',
        success: false,
      });

    if (comment.user_id.toString() !== req.user._id.toString())
      return res.status(403).json({
        message: 'Unauthorized to delete this comment',
        success: false,
      });

    await CommentModel.findByIdAndDelete(comment._id);

    return res.status(200).json({
      message: 'Comment deleted successfully',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const { commentText } = req.body;
    const { id } = req.params;

    const comment = await CommentModel.findById(id);

    if (!comment)
      return res.status(404).json({
        message: 'Comment not found',
        success: false,
      });

    if (comment.user_id.toString() !== req.user._id.toString())
      return res.status(403).json({
        message: 'Unauthorized to delete this comment',
        success: false,
      });

    comment.commentText = commentText;
    await comment.save();

    return res.status(200).json({
      message: 'Comment updated successfully',
      success: true,
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

const getComment = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await CommentModel.find({ video_id: videoId })
      .populate('user_id', 'channelName', 'logo_Url')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'Comments fetched successfully',
      success: true,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};

export { newComment, deleteComment, updateComment, getComment };
