const path = require("path");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const upload = require("../middleware/upload");
const currentPath = "/register";

router.get("/", (req, res) => {
  res.render("register.ejs");
});

router.post("/", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: username.toLowerCase(),
    displayname: username,
    email: email.toLowerCase(),
    password: hashedPassword,
  });
  user.save();
  res.redirect("/login");
});

module.exports = { path: currentPath, router };
