const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserModel = require("../models/userModel");

router.route("/").get((req, res) => {
  res.send("Hello from router");
});

router.route("/get-users").get((req, res) => {
  UserModel.find((err, users) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(users);
    }
  });
});

router.route("/register").post((req, res) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const newUser = new UserModel({
        username: req.body.username,
        password: hash,
      });

      newUser
        .save()
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          res.status(200).json({ error: err });
        });
    });
  });
});

router.route("/login").post(async (req, res) => {
  if (req.body.username.trim() === "" || req.body.password.trim() === "") {
    return res.status(400).json({ message: "This field is required" });
  }
  try {
    const user = await UserModel.findOne({
      username: req.body.username,
    }).exec();
    if (!user) {
      return res.status(400).json({ message: "Wrong username" });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json({ message: "Wrong password" });
    }
    return res.json({ message: "Logged in!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
