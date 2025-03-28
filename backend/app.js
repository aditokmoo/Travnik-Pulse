const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const errorController = require("./controllers/errorController");
const authRouter = require("./routes/authRoute");
const tourRouter = require("./routes/tourRoute");
const reviewRouter = require("./routes/reviewRoute");
const shopRouter = require("./routes/shopRoute");
const mongoSanitize = require("express-mongo-sanitize");

const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });
const app = express();

app.use(cors());
//app.use(helmet()); // Remove $ and . symbols from input

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(mongoSanitize());

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/tours", tourRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/shops", shopRouter);

app.use("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(errorController);

module.exports = app;
