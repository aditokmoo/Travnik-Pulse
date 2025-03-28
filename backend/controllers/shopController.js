const path = require("path");
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const AppError = require(path.join(__dirname, "..", "utils", "AppError"));
const Shop = require(path.join(__dirname, "..", "models", "Shop"));
const fs = require("fs").promises;
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

exports.addShop = catchAsync(async (req, res, next) => {
  req.body.location = JSON.parse(req.body.location);

  const { shopName, location, category } = req.body;

  if (!req.file || !req.file.mimetype.startsWith("image"))
    return next(new AppError(400, "Provide valid image"));

  const imageName = uuidv4();

  await sharp(req.file.buffer)
    .jpeg(90)
    .resize({ width: 1280, height: 800, fit: "cover" })
    .toFile(`public/${imageName}.jpeg`);

  await Shop.create({
    shopName,
    location,
    coverImg: `${imageName}.jpeg`,
    category: category.toLowerCase(),
  });

  res.status(201).json({
    status: "success",
    message: "Shop added successfully!",
  });
});

exports.getAllShops = catchAsync(async (req, res, next) => {
  const shops = await Shop.find();
  return res.status(200).json({
    status: "success",
    shops,
  });
});

exports.getSingleShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.findById(req.params.shopID);
  return res.status(200).json({
    status: "success",
    shop,
  });
});

exports.getShopsWithin = catchAsync(async (req, res, next) => {
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

  const shops = await Shop.find({
    location: {
      $geoWithin: {
        $centerSphere: [[parseFloat(lng), parseFloat(lat)], radius],
      },
    },
  });
  res.status(200).json({
    status: "success",
    results: shops.length,
    shops,
  });
});

exports.editShop = catchAsync(async (req, res, next) => {
  const { shopID } = req.params;
  const shop = await Shop.findById(shopID);
  const imageName = uuidv4();

  if (req.body.category) req.body.category = req.body.category.toLowerCase();

  if (req.file) {
    await sharp(req.file.buffer)
      .jpeg(90)
      .resize({ width: 1280, height: 800, fit: "cover" })
      .toFile(`public/${imageName}.jpeg`);

    req.body.coverImg = `${imageName}.jpeg`;
    await fs.unlink(`public/${shop.coverImg}`);
  }

  if (req.body.location) req.body.location = JSON.parse(req.body.location);

  if (!shop) return next(new AppError(404, "Shop not found!"));
  Object.entries(req.body).forEach((e) => {
    shop[e[0]] = e[1];
  });

  await shop.save({ validateBeforeSave: true });

  res.status(200).json({
    status: "success",
    message: "Shop updated successfully!",
  });
});

exports.deleteShop = catchAsync(async (req, res, next) => {
  await Shop.findByIdAndDelete(req.params.shopID);
  res.status(204).json({});
});
