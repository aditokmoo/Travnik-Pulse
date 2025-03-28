const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please provide username"],
    },
    password: {
      type: String,
      minlength: [6, "Password must contain at least 6 characters"],
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide password confirm"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    ratedTours: {
      type: [
        {
          tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour" },
          value: { type: Number },
        },
      ],
      ref: "Tour",
    },
    reviewedTours: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review",
        },
      ],
    },
    bookmarkedTours: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tour" }],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isNew || !this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
