import jwt, { decode } from 'jsonwebtoken';

export const checkAuth = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized',
        success: false,
      });
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedUser) {
      return res.status(401).json({
        message: 'Unauthorized',
        success: false,
      });
    }

    req.user = decodedUser;
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? 'Something went wrong',
      success: false,
    });
  }
};
