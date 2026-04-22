import { asyncHandler } from "../utils/asyncHandler.js";

// @ts-ignore
const registerUser = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "ok",
  });
});

export { registerUser };
