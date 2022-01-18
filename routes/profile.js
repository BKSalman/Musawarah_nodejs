const express = require("express");
const router = express.Router();
const { requiresLogin } = require("../middleware/userlogged");
const upload = require("../middleware/upload");
const { viewProfile, updateProfile, follow, viewfav } = require("../controllers/profile");

const profilepath = "/profile";

router.get("/:username", requiresLogin, viewProfile);

router.get("/:username/fav", requiresLogin, viewfav);

router.post("/", requiresLogin, upload, updateProfile);

router.post("/follow/:username", requiresLogin, follow)

module.exports = { path: profilepath, router };
