const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { newPost, postDetails, deletePost } = require("../controllers/posts");
const { isOwner } = require("../middleware/isOwner");
const { isNotLoggedIn } = require("../middleware/userlogged");

const postpath = "/post";

router.get("/s/:id", postDetails);

router.get("/new", isNotLoggedIn, async (req, res) => {
  res.render("post-form");
});

router.get("/delete/:id", isNotLoggedIn, isOwner, deletePost);

router.post("/new", isNotLoggedIn, upload, newPost);

module.exports = { path: postpath, router };
