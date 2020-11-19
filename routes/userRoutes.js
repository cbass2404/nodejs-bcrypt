const express = require("express");
const { model } = require("../models/userModel");
const router = express.Router();
const UserModel = require("../models/userModel");

router.route("/").get((req, res) => {
  res.send("Hello from router");
});

module.exports = router;
