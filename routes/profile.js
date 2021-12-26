const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Post } = require("../models/Post");
const { isNotLoggedIn } = require("../middleware/userlogged");
const upload = require("../middleware/upload");

const profilepath = "/profile";

router.get("/:username", isNotLoggedIn, async (req, res) => {
  const user = await User.findOne({
    username: req.params.username.toLowerCase(),
  }).exec();
  if (user === []) {
    req.flash("error", "something went wrong.");
    res.redirect("/");
  }
  const userPosts = await Post.find({
    postAuthor: user._id,
  });
  res.render("profile", { user: user, posts: userPosts });
});

router.post("/", isNotLoggedIn, upload, async (req, res) => {
  try {
    if (req.file) {
      console.log(req.file.filename);
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { displayname: req.body.displayName, image: req.file.filename }
      );
      res.redirect(`${profilepath}/${req.user.username}`);
    } else {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { displayname: req.body.displayName }
      );
      res.redirect(`${profilepath}/${req.user.username}`);
    }
  } catch {
    res.redirect(`${profilepath}/${req.user.username}`);
  }
});

/* async (req, res) =>{
  const user = await User.findOneAndUpdate(
    {_id:req.session.passport.user},
    {name: req.body.username,
        image: req.file.image}
    )
  console.log(req.file.image);
} */

// router.get('/', isNotLoggedIn, (req, res, next) => {
//     res.render('profile', { user: req.user });
// })

module.exports = { path: "/profile", router };
