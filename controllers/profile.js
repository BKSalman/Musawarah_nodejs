const { User } = require("../models/User");
const { Post } = require("../models/Post");

const viewProfile = async (req, res) => {
  const profileuser = await User.findOne({
    username: req.params.username.toLowerCase(),
  }).select('-_id -__v -password')
    .populate("followers.user")
    .populate("following.user")
    .exec();
  let Followed = undefined;
  const userFollowers = profileuser.followers.map((Follows) => {
    return Follows.user;
  });
  if (req.user) {
    for (const userFollower of userFollowers) {
      if (userFollower.id === req.user.id) {
        Followed = true;
        break;
      } else {
        Followed = false;
      }
      console.log(Followed);
    }
  }
  if (profileuser === []) {
    req.flash("error", "something went wrong.");
    return res.redirect("/");
  }
  const userPosts = await Post.find({
    postAuthor: profileuser._id,
  });
  return res.render("profile", {
    profileuser: profileuser,
    posts: userPosts,
    Followed: Followed,
  });
};

const viewfav = async (req, res) => {
	const profileuser = await User.findOne({
	  username: req.user.username.toLowerCase(),
	}).select('-_id -__v -password')
	  .populate("followers.user")
	  .populate("following.user")
	  .populate("favoritePosts")
	  .exec();
	if (profileuser === []) {
	  req.flash("error", "something went wrong.");
	  return res.redirect("/");
	}
	return res.render("profile-favorite", {
	  profileuser: profileuser,
	});
  };

const updateProfile = async (req, res) => {
  try {
    if (req.file) {
      console.log(req.file.filename);
      await User.findByIdAndUpdate(req.user._id, {
        displayName: req.body.displayName,
        image: req.file.filename,
      });
      return res.redirect(`/profile/${req.user.username}`);
    } else {
      await User.findByIdAndUpdate(req.user._id, {
        displayName: req.body.displayName,
      });
      return res.redirect(`/profile/${req.user.username}`);
    }
  } catch (err) {
    console.log(err);
    return res.redirect(`/profile/${req.user.username}`);
  }
};

const follow = async (req, res) => {
  try {
    const user = req.user;
    const profileUser = await User.findOne({ username: req.params.username });
    const action = req.body.action;
    if (action === "Follow") {
      await User.findByIdAndUpdate(
        user.id,
        {
          $push: { following: { user: profileUser.id } },
        },
        {
          new: true,
        }
      ).exec();

      await profileUser
        .updateOne(
          {
            $push: { followers: { user: user.id } },
          },
          {
            new: true,
          }
        )
        .exec();
      return res.redirect(`/profile/${req.params.username}`);
    }
    await User.findByIdAndUpdate(
      user.id,
      {
        $pull: { following: { user: profileUser.id } },
      },
      {
        new: true,
      }
    ).exec();

    await profileUser
      .update(
        {
          $pull: { followers: { user: user.id } },
        },
        {
          new: true,
        }
      )
      .exec();
	  return res.redirect(`/profile/${req.params.username}`);
  } catch (error) {
    console.log(error);
    return res.redirect(`/profile/${req.params.username}`);
  }
};

module.exports = { viewProfile, updateProfile, follow, viewfav };
