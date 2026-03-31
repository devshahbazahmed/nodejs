import jwt from "jsonwebtoken";

export const authenticationMiddleware = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];

    // Header authorization: Bearer <TOKEN>

    if (!header) return next();

    if (!header.startsWith("Bearer"))
      return res.status(400).json({
        error: "Authorization header must start with bearer",
      });

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    return next();
  } catch (error) {
    next();
  }
};

export const ensureAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "You must be authenticated" });
  }
  return next();
};

export const restrictToRole = function (role) {
  return function (req, res, next) {
    if (req.user.role !== role) {
      return res
        .status(401)
        .json({ error: "You are not authorized to access this resource" });
    }

    return next();
  };
};
