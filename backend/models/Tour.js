const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide tour name"],
  },
  categories: {
    type: [String],
    enum: [
      "food",
      "nightlife",
      "history",
      "art",
      "movies",
      "museums",
      "amenities",
      "music",
      "dayTrip",
      "culture",
      "science",
      "parks",
      "show",
      "sport",
      "events",
      "circus",
      "seminars",
      "river",
      "shopping",
      "workshop",
      "hiking",
      "camping",
      "technology",
      "outdoor",
      "coffeeShop",
      "bikingRoutes",
      "petFriendlyPlaces",
      "vegeterian",
    ],
    required: [true, "Provide categories for tour"],
  },
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
  },
  duration: {
    type: Number,
    required: [true, "Please provide duration of the tour"],
  },
  time: {
    type: String,
    required: [true, "please provide time"],
  },
  date: {
    type: Date,
    required: [true, "Please provide the date of the event"],
  },
  price: {
    type: mongoose.Schema.Types.Mixed,
    enum: ["Free"],
    required: [true, "Provide price of event or asign as FREE"],
  },
  ratings: {
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        value: { type: Number },
      },
    ],
  },

  reviews: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },

  coverImg: {
    type: String,
    required: [true, "Provide tour cover image"],
  },
  description: {
    type: String,
    required: [true, "Please provide description of your tour"],
  },
});

const Tour = mongoose.model("Tour", TourSchema);

module.exports = Tour;
