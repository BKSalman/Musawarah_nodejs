const express = require("express");
const router = express.Router();
const { isNotLoggedIn } = require("../middleware/userlogged");
const upload = require("../middleware/upload");
const { viewProfile, updateProfile } = require("../controllers/profile");

const profilepath = "/profile";

router.get("/:username", isNotLoggedIn, viewProfile);

router.post("/", isNotLoggedIn, upload, updateProfile);

module.exports = { path: profilepath, router };
