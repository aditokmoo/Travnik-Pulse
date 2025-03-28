const path = require("path");
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const AppError = require(path.join(__dirname, "..", "utils", "AppError"));
const Tour = require(path.join(__dirname, "..", "models", "Tour"));
const User = require(path.join(__dirname, "..", "models", "User"));
const Review = require(path.join(__dirname, "..", "models", "Review"));
const fs = require("fs").promises;
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

exports.reviewTour = catchAsync(async (req, res, next) => {
  const { review } = req.body;
  if (!review) return next(new AppError(400, "Provide review content"));
  const tour = await Tour.findById(req.params.tourID);
  const imageArr = [];
  if (req.files) {
    await Promise.all(
      req.files.map(async (file) => {
        const imageName = uuidv4();
        imageArr.push(`${imageName}.jpeg`);
        await sharp(file.buffer)
          .jpeg({ quality: 90 })
          .resize({ width: 1280, height: 800, fit: "contain" })
          .toFile(`public/${imageName}.jpeg`);
      })
    );
  }

  let reviewDocument;
  if (req.files)
    reviewDocument = await Review.create({
      review,
      images: imageArr,
      user: req.user.id,
      tour: req.params.tourID,
      approved: req.user.role === "admin" ? true : false,
    });
  if (!req.files)
    reviewDocument = await Review.create({
      user: req.user.id,
      review,
      tour: req.params.tourID,
      approved: req.user.role === "admin" ? true : false,
    });

  tour.reviews.push(reviewDocument.id);
  await tour.save({ validateBeforeSave: false });

  //Save Review to user profile
  const user = await User.findById(req.user.id);
  user.reviewedTours.push(reviewDocument.id);

  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "Review has been made successfully!",
  });
});

exports.getUnapprovedReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ approved: false })
    .populate({
      path: "user",
      select: "username",
    })
    .populate({ path: "tour", select: "name description coverImg" });

  res.status(200).json({
    status: "success",
    reviews,
  });
});

exports.getSingleReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewID)
    .populate({
      path: "user",
      select: "username",
    })
    .populate({ path: "tour", select: "name description coverImg" });

  res.status(200).json({
    status: "success",
    review,
  });
});

exports.approveReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewID);
  review.approved = true;
  await review.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Review approved",
  });
});

exports.declineReview = catchAsync(async (req, res, next) => {
  const { reviewID } = req.params;

  const review = await Review.findById(reviewID);
  const user = await User.findById(review.user);
  const tour = await Tour.findById(review.tour);

  //remove review from user and tour database

  user.reviewedTours = user.reviewedTours.filter(
    (review) => review.toHexString() !== reviewID
  );

  tour.reviews = tour.reviews.filter(
    (review) => review.toHexString() !== reviewID
  );

  review.images.forEach((img) => {
    fs.unlink(`public/${img}`);
  });

  await user.save({ validateBeforeSave: false });
  await tour.save({ validateBeforeSave: false });

  await Review.findByIdAndDelete(req.params.reviewID);
  res.status(204).json({});
});
