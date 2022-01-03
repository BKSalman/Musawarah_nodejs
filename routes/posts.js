const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { newPost, postDetails, deletePost } = require("../controllers/posts");
const { isOwner } = require("../middleware/isOwner");
const { requiresLogin } = require("../middleware/userlogged");
const { Like } = require("../controllers/likes");

const postpath = "/post";

router.get("/s/:id", postDetails);

router.get("/new", requiresLogin, async (req, res) => {
  res.render("post-form");
});

router.get("/delete/:id", requiresLogin, isOwner, deletePost);

router.post("/new", requiresLogin, upload, newPost);

router.post("/like/:id", requiresLogin, Like);

module.exports = { path: postpath, router };
