const express = require("express");
const router = express.Router();
const { getCategories, addCategory} = require("../controllers/categories")

router.get("/", getCategories);

router.post("/add", addCategory);

module.exports = { path: "/category", router };
