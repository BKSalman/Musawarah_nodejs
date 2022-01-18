const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { newPost, postDetails, deletePost, commentPOST, postForm, favPost } = require("../controllers/posts");
const { isOwner } = require("../middleware/isOwner");
const { requiresLogin } = require("../middleware/userlogged");
const { Like } = require("../controllers/likes");

const postpath = "/post";

router.get("/s/:id", postDetails);

router.get("/new", requiresLogin, postForm);

router.post("/new", requiresLogin, upload, newPost);

router.get("/delete/:id", requiresLogin, isOwner, deletePost);

router.post("/like/:id", requiresLogin, Like);

router.post("/fav/:id", requiresLogin, favPost);

// router.get("/comment/:id", requiresLogin, commentGET);

router.post("/comment/:id", requiresLogin, upload, commentPOST);

module.exports = { path: postpath, router };
