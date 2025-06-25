const express = require("express");
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("username").trim().isLength({ min: 3 }),
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 3 }),
  (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.sendStatus(400).json({
        error: error.array(),
        message: "invalid data",
      });
    }
    res.send(error);
  }
);

module.exports = router;
