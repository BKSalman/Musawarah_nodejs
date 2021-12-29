const express = require("express");
const router = express.Router();
const { newUser } = require("../controllers/register");
const currentPath = "/register";

router.get("/", (req, res) => {
  res.render("register.ejs");
});

router.post("/", newUser);

module.exports = { path: currentPath, router };
