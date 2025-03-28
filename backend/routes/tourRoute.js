const express = require("express");
const router = express.Router();
const path = require("path");
const {
  createTour,
  getTours,
  getSingleTour,
  editTour,
  deleteTour,
  rateTour,
  bookmarkTour,
  getToursWithin,
  reviewTour,
} = require(path.join(__dirname, "..", "controllers", "tourController"));

const { protect } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));

const { protectAdmin } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router
  .route("/")
  .post(protectAdmin, upload.single("coverImg"), createTour)
  .get(getTours);
router
  .route("/:tourID")
  .get(getSingleTour)
  .patch(protectAdmin, upload.single("coverImg"), editTour)
  .delete(protectAdmin, deleteTour);

router.get("/tours-within/distance/:distance/center/:latlng", getToursWithin);

//Rate tour
router.patch("/rate-tour/:tourID", protect, rateTour);
router.patch(
  "/review-tour/:tourID",
  protect,
  upload.array("images", 6),
  reviewTour
);

//Bookmark tour

router.patch("/bookmark-tour/:tourID", protect, bookmarkTour);

module.exports = router;
