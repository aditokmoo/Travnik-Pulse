const mongoose = require("mongoose");

const User = require("./User");

const ReviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour" },
    review: { type: String, required: true },
    images: [String],
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ReviewSchema.pre("remove", async function (next) {
  const review = this;

  // Remove the review from the users' reviewedTour arrays

  try {
    await User.updateMany(
      { reviewedTours: review._id },
      { $pull: { reviewedTours: review._id } }
    );
    next();
  } catch (error) {
    next(error);
  }
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
