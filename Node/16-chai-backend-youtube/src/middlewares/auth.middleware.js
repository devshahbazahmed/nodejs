import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    let token;

    if (
      req.cookies?.accessToken &&
      typeof req.cookies.accessToken === "string"
    ) {
      token = req.cookies.accessToken;
    } else if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token || token === "undefined" || token === "null") {
      throw new ApiError(401, "Unauthorized request");
    }

    console.log("TOKEN:", token);

    // const token =
    //   req.cookies?.accessToken ||
    //   req.header("Authorization")?.replace("Bearer ", "");

    // if (!token) throw new ApiError(401, "Unauthorized request");

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "Invalid access token");

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
