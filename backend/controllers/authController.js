const path = require("path");
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const AppError = require(path.join(__dirname, "..", "utils", "AppError"));
const jwt = require("jsonwebtoken");
const User = require(path.join(__dirname, "..", "models", "User"));
const bcrypt = require("bcrypt");

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return next(new AppError(400, "Provide all fields"));

  const user = await User.findOne({ username });
  if (!user) return next(new AppError(401, "Invalid username/password"));

  const compared = await bcrypt.compare(password, user.password);
  if (!compared) return next(new AppError(401, "Invalid username/passwrod"));

  const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });

  return res.status(200).json({
    status: "successs",
    message: "Logged in successfully!",
    token,
  });
});

exports.protectAdmin = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")?.[1];
  if (!token) return next(new AppError(401, "Unauthorized!"));
  const verified = jwt.verify(
    token,
    process.env.SECRET_KEY,
    async (err, decoded) => {
      if (err) return next(new AppError(401, "Token malformed, login again"));
      const user = await User.findById(decoded.id);
      if (!user)
        return next(
          new AppError(400, "User does no longer exist. Please sign up!")
        );

      if (user.role !== "admin") return next(new AppError(401, "Unauthorized"));
      req.user = user;
      next();
    }
  );
});

//User auth

exports.signup = catchAsync(async (req, res, next) => {
  const { username, password, passwordConfirm } = req.body;
  if (!username || !password || !passwordConfirm)
    return next(new AppError(400, "Provide all fields!"));

  if (password !== passwordConfirm)
    return next(new AppError(400, "Passwords are not matching!"));
  const user = await User.create({
    username: username.toLowerCase(),
    password,
    passwordConfirm,
  });
  const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
  res.status(201).json({
    status: "success",
    message: "Signed up successfully!",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")?.[1];
  if (!token) return next(new AppError(401, "Unauthorized!"));
  const verified = await jwt.verify(
    token,
    process.env.SECRET_KEY,
    async (err, decoded) => {
      if (err) return next(new AppError(401, "Token malformed, login again"));
      const user = await User.findById(decoded.id);
      if (!user)
        return next(
          new AppError(400, "User does no longer exist. Please sign up!")
        );

      req.user = user;
      next();
    }
  );
});

exports.getUser = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")?.[1];
  if (!token) return next(new AppError(401, "Unauthorized!"));
  const verified = await jwt.verify(
    token,
    process.env.SECRET_KEY,
    async (err, decoded) => {
      if (err) return next(new AppError(401, "Token malformed, login again"));
      const user = await User.findById(decoded.id)
        .select("-password")
        .populate({
          path: "reviewedTours",
          populate: { path: "tour", select: "coverImg name" },
        })
        .populate({ path: "ratedTours.tour", select: "coverImg name" })
        .populate({ path: "bookmarkedTours", select: "name coverImg" });
      if (!user)
        return next(
          new AppError(400, "User does no longer exist. Please sign up!")
        );

      res.status(200).json({
        status: "success",
        user,
      });
    }
  );
});
