const express = require("express");
const multer = require("multer");
const path = require("path");
const { protect, protectAdmin } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));

const {
  reviewTour,
  getUnapprovedReviews,
  approveReview,
  declineReview,
  getSingleReview,
} = require(path.join(__dirname, "..", "controllers", "reviewController"));

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.patch(
  "/review-tour/:tourID",
  protect,
  upload.array("images", 6),
  reviewTour
);

router.get("/unapproved-reviews", protectAdmin, getUnapprovedReviews);
router.get("/unapproved-reviews/:reviewID", protectAdmin, getSingleReview);
router.patch("/approve-review/:reviewID", protectAdmin, approveReview);
router.delete("/decline-review/:reviewID", protectAdmin, declineReview);

module.exports = router;
