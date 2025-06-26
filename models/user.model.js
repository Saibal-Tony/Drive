const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    require: true,
    lowercase: true,
    unique: true,
    minlength: [3, "Username must be atleast 3 charater long"],
  },

  email: {
    type: String,
    trim: true,
    require: true,
    lowercase: true,
    unique: true,
    minlength: [13, "Username must be atleast 13 charater long"],
  },

  password: {
    type: String,
    trim: true,
    require: true,
    minlength: [5, "Username must be atleast 5 charater long"],
  },
});

const user = mongoose.model("user", userSchema); // .model() --> gives you the access to write,read,delete,etc
module.exports = user;
