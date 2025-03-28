const errorController = (err, req, res, next) => {
  if (process.env.NODE_ENV === "dev") {
    res.status(500).json({
      err,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    if (err.code === 11000)
      return res.status(400).json({
        status: "fail",
        message: "Username already in use",
      });

    if (err.errors?.date) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect date format",
      });
    }

    if (err.errors?.["categories.0"]) {
      const { value } = err.errors["categories.0"]?.properties;

      return res.status(400).json({
        status: "fail",
        message: `${value} isn't right category`,
      });
    }

    if (err.name === "ValidationError") {
      const errMsg = Object.values(err.errors).at(0)?.message;

      return res.status(400).json({
        status: "fail",
        message: errMsg,
      });
    }

    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: "fail",
        message: err.message,
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Something went really wrong!",
      });
    }
  }
};

module.exports = errorController;
