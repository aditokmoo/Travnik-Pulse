class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.isOperational = true;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
