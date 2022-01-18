const express = require("express");
const router = express.Router();
const { requiresLogin } = require("../middleware/userlogged");
const { viewfav } = require("../controllers/profile");

const Ipath = "/i";

router.get("/fav", requiresLogin, viewfav);

module.exports = { path: Ipath, router };
