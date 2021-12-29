const mongoose = require("mongoose"),
  { Schema } = require("mongoose");
const path = require("path");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  first_name: String,
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: { type: String, default: "ppL.png" },
  password: { type: String, required: true },
  is_staff: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  date_joined: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  User: mongoose.model("users", userSchema),
};