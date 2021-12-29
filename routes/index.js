const express = require("express");
const router = express.Router();
const { homePosts } = require("../controllers/index");

/* GET home page. */
router.get("/", homePosts);

module.exports = { path: "/", router };
