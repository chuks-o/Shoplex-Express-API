class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message,
    data: null,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
