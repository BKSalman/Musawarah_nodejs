const express = require("express");
const router = express.Router();
const { homePosts } = require("../controllers/index");
const { requiresLogout } = require("../middleware/userlogged");
const passport = require("passport");

/* GET home page. */
router.get("/", homePosts);

router.get("/login", requiresLogout, (req, res) => {
  res.render("login.ejs");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/login",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    successFlash: true,
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = { path: "/", router };
