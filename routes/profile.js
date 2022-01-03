const express = require("express");
const router = express.Router();
const { requiresLogin } = require("../middleware/userlogged");
const upload = require("../middleware/upload");
const { viewProfile, updateProfile } = require("../controllers/profile");

const profilepath = "/profile";

router.get("/:username", requiresLogin, viewProfile);

router.post("/", requiresLogin, upload, updateProfile);

module.exports = { path: profilepath, router };
