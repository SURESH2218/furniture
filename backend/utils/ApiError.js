const ApiError = (
  statusCode,
  message = "Something went wrong",
  errors = []
) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.success = false;
  error.errors = errors;
  Error.captureStackTrace(error, ApiError);
  return error;
};

export default ApiError;
