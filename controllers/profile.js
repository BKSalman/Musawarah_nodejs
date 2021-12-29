const { User } = require("../models/User");
const { Post } = require("../models/Post");

const viewProfile = async (req, res) => {
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
  res.render("profile", { profileuser: user, posts: userPosts });
};

const updateProfile = async (req, res) => {
  try {
    if (req.file) {
      console.log(req.file.filename);
       await User.findByIdAndUpdate(
        req.user._id,
        { displayName: req.body.displayName, image: req.file.filename }
      );
      res.redirect(`/profile/${req.user.username}`);
    } else {
       await User.findByIdAndUpdate(req.user._id,
        { displayName: req.body.displayName }
      );
      res.redirect(`/profile/${req.user.username}`);
    }
  } catch (err){
    console.log(err);
    res.redirect(`/profile/${req.user.username}`);
  }
};

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

module.exports = { viewProfile, updateProfile };
