const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: [true, "Provide shop name"],
  },
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
  },
  coverImg: {
    type: String,
    required: [true, "Provide cover image of shop"],
  },
  category: {
    type: String,
    required: [true, "provide category of shop"],
  },
});

const Shop = mongoose.model("Shop", ShopSchema);

module.exports = Shop;
