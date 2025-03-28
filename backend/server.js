const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.DB_LINK.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then((res) => console.log("Successfully connected to database"))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // Optionally, perform any cleanup or logging here
  process.exit(1); // Exit with an error code
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Optionally, perform any cleanup or logging here
  process.exit(1); // Exit with an error code
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
