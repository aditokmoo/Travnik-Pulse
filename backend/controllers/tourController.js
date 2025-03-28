const path = require("path");
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const AppError = require(path.join(__dirname, "..", "utils", "AppError"));
const Tour = require(path.join(__dirname, "..", "models", "Tour"));
const User = require(path.join(__dirname, "..", "models", "User"));
const Review = require(path.join(__dirname, "..", "models", "Review"));
const sharp = require("sharp");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

exports.createTour = catchAsync(async (req, res, next) => {
  req.body.categories = req.body.categories.split(",");
  req.body.location = JSON.parse(req.body.location);
  const {
    name,
    categories,
    location,
    duration,
    date,
    price,
    description,
    time,
  } = req.body;

  if (!req.file || !req.file.mimetype.startsWith("image"))
    return next(new AppError(400, "Provide valid image"));

  const imageName = uuidv4();

  if (!categories || categories?.length === 0)
    return next(new AppError(400, "Provide categories for tour"));

  if (price <= 0)
    return next(
      new AppError(
        400,
        "Price must be greater than 0. If you want it free, click option 'FREE'"
      )
    );
  if (duration <= 0)
    return next(new AppError(400, "Duration must be greater than 0"));

  const tour = await Tour.create({
    name,
    categories,
    location,
    date,
    price,
    description,
    duration,
    coverImg: `${imageName}.jpeg`,
    time,
  });

  await sharp(req.file.buffer)
    .jpeg(90)
    .resize({ width: 1280, height: 800, fit: "cover" })
    .toFile(`public/${imageName}.jpeg`);

  res.status(201).json({
    status: "success",
    message: "Tour created successfully!",
  });
});

exports.getTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find().populate({
    path: "reviews",
    populate: { path: "user", select: "username" },
  });
  /*.populate({ path: "reviews", populate: { path: "tour" } });*/

  res.status(200).json({
    status: "success",
    results: tours.length,
    tours,
  });
});

exports.getSingleTour = catchAsync(async (req, res, next) => {
  const { tourID } = req.params;

  const tour = await Tour.findById(tourID).populate({
    path: "reviews",
    populate: { path: "user", select: "username" },
  });
  if (!tour) return next(new AppError(404, "Tour not found!"));

  tour.reviews = tour.reviews.filter((review) => review.approved);
  return res.status(200).json({
    status: "success",
    tour,
  });
});

exports.editTour = catchAsync(async (req, res, next) => {
  const { tourID } = req.params;
  const tour = await Tour.findById(tourID);
  const imageName = uuidv4();

  if (req.file) {
    await sharp(req.file.buffer)
      .jpeg(90)
      .resize({ width: 1280, height: 800, fit: "cover" })
      .toFile(`public/${imageName}.jpeg`);

    req.body.coverImg = `${imageName}.jpeg`;
    await fs.unlink(`public/${tour.coverImg}`);
  }

  if (req.body.categories) req.body.categories = req.body.categories.split(",");
  if (req.body.location) req.body.location = JSON.parse(req.body.location);

  if (!tour) return next(new AppError(404, "Tour not found!"));
  Object.entries(req.body).forEach((e) => {
    tour[e[0]] = e[1];
  });

  await tour.save({ validateBeforeSave: true });

  res.status(200).json({
    status: "success",
    message: "Tour updated successfully!",
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const { tourID } = req.params;
  await User.updateMany(
    { "ratedTours.tour": tourID },
    { $pull: { ratedTours: { tour: tourID } } }
  );

  await User.updateMany(
    { bookmarkedTours: tourID },
    { $pull: { bookmarkedTours: tourID } }
  );

  const reviewsOfTour = await Review.find({ tour: tourID });
  const removalPromises = reviewsOfTour.map(async (review) => {
    await User.updateMany(
      { reviewedTours: review._id },
      { $pull: { reviewedTours: review._id } }
    );
  });
  await Promise.all(removalPromises);

  await Review.deleteMany({ tour: tourID });
  const tour = await Tour.findById(tourID);
  await fs.unlink(`public/${tour.coverImg}`);
  await Tour.findByIdAndDelete(tourID);
  res.status(204).json({});
});

exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { latlng, distance } = req.params;
  const [lat, lng] = latlng.split(",");

  if (!lat || !lng)
    return next(
      new AppError(
        400,
        "Please provide latitude and longitude in the format lat,lng."
      )
    );

  const radius = distance / 6378.1; // Radius of earth in radians

  const tours = await Tour.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  const notExpiredTours = tours.filter((tour) => {
    const hours = +tour.time.split(":").at(0);
    const minutes = +tour.time.split(":").at(1);

    return new Date(tour.date).setHours(hours, minutes) >= new Date().getTime();
  });

  res.status(200).json({
    status: "success",
    results: tours.length,
    tours: notExpiredTours,
  });
});

//Protected routes

exports.rateTour = catchAsync(async (req, res, next) => {
  const { rating } = req.body;
  //If no rating provided, throw error
  if (!rating) return next(new AppError(400, "Please provide rating value!"));
  const tour = await Tour.findById(req.params.tourID);

  //If user have already rated tour, throw error
  if (tour.ratings.some((rating) => rating.user.toHexString() === req.user.id))
    return next(new AppError(400, "You have already rated this tour"));
  tour.ratings.push({ user: req.user.id, value: rating });
  await tour.save({ validateBeforeSave: false });

  //Add rating to user Rated Tours Array
  const user = await User.findById(req.user.id);
  user.ratedTours.push({ tour: req.params.tourID, value: rating });
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Tour rated successfully!",
  });
});

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
    });
  if (!req.files)
    reviewDocument = await Review.create({
      user: req.user.id,
      review,
      tour: req.params.tourID,
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

//User funcionality + Tour

exports.bookmarkTour = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user.bookmarkedTours.includes(req.params.tourID))
    user.bookmarkedTours.push(req.params.tourID);
  else
    user.bookmarkedTours = user.bookmarkedTours.filter(
      (bookmark) => bookmark.toHexString() !== req.params.tourID
    );

  await user.save({ validateBeforeSave: false });

  return res.status(200).json({
    status: "success",
    message: user.bookmarkedTours.includes(req.params.tourID)
      ? "Tour bookmarked!"
      : "Tour unbookmarked",
  });
});

//Admin get All reviews waiting for aprove
