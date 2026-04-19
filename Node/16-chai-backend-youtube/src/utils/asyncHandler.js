const asyncHandler = (requestHandler) => {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

// const asyncHandler = () => {};
// const asyncHandler = (fn) => {};
// const asyncHandler = (fn) => () => {};
// const asyncHandler = (fn) => async () => {};

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     req.status(error.code || 500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };
