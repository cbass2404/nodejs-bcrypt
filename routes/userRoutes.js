const express = require("express");
const router = express.Router();
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
  console.log(req.body);
  const newUser = new UserModel(req.body);

  newUser
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send("Unable to add user " + err);
    });
});

module.exports = router;
