const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// registration page
router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("username").trim().isLength({ min: 3 }),
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 3 }),
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.sendStatus(400).json({
        error: error.array(),
        message: "invalid data",
      });
    }

    const { email, username, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10); //10 - no. of times the password is hashed

    const newUser = await userModel.create({
      username,
      password: hashPassword,
      email,
    });

    res.json(newUser); // because all the data are read in josn format
  }
);

// login page
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 5 }),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array(),
        message: "Invalid Data",
      });
    }

    const { username, password } = req.body;

    const user = await userModel.find({
      username: username,
    });
    if (!user) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }

    const isMatch = await bycrypt.compare(password, user.password); //compares the body password to the database password
    if (!isMatch) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }

    // JWT - Json Web Token helps us staying authorised after login
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET
    );

    //these tokens are saved in cookies
    res.cookie("token", token);
  }
);

module.exports = router;
