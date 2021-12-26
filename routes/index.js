const express = require("express");
const router = express.Router();
const { Post } = require("../models/Post");

/* GET home page. */
router.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("home", { posts: posts });
});

// router.get('/new', (req, res) => {
//   console.log('form')
//   res.render("form")
// })

module.exports = { path: "/", router };
