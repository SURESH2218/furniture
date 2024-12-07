const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(error.status || 500).json({
        success: false,
        messsage: error.messsage,
      });
    }
  };
};

export default asyncHandler;

// const asyncHandler = (requestHandler) => {
//     return (req, res, next) => {
//       Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//     };
//   };
