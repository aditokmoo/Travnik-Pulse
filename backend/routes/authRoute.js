const express = require("express");
const path = require("path");
const { login, signup, getUser } = require("../controllers/authController");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/getUser", getUser);

module.exports = router;
