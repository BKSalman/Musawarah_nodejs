const express = require("express");
const router = express.Router();
const { Post } = require("../models/Post");
const { User } = require("../models/User");
const upload = require("../middleware/upload");
const { isNotLoggedIn } = require("../middleware/userlogged");

const postpath = "/post";

router.get("s/:id", async (req, res) => {
  console.log("get art");
  const post = await Post.findById(req.params.id);
  user = req.user;
  const postAuthor = await User.findById(post.postAuthor).exec();

  res.render("post-details", {
    post: post,
    postAuthor: postAuthor,
    user: user,
  });
});

router.get("/new", isNotLoggedIn, async (req, res) => {
  res.render("post-form");
});

router.post("/new", isNotLoggedIn, upload, async (req, res) => {
  try {
    const title = req.body.postTitle;
    const author = req.user._id;
    const image = req.file.filename;
    const desc = req.body.postDesc;
    const post = new Post({
      postTitle: title,
      postAuthor: author,
      desc: desc,
      image: image,
    });
    await post.save();
    res.redirect(`/`);
  } catch (err) {
    console.log(err);
    res.redirect(`/`);
  }
});

module.exports = { path: postpath, router };
