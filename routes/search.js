const express = require("express");
const router = express.Router();
const { searchEngine } = require("../controllers/search");

const searchPath = "/search";

router.get("/", (req, res) => {
  res.render("search", { posts: undefined });
});

router.post("/", searchEngine);

module.exports = { path: searchPath, router };
