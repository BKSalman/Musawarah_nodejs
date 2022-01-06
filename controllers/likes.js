const { Post } = require("../models/Post");

const Like = async (req, res, next) => {
  if (!res.locals.isLoggedIn) {
    return res.json({ isLoggedIn: !res.locals.isLoggedIn });
  }
  const action = req.body.action;
    if (action === "Like") {
      Post.findByIdAndUpdate(
        req.params.id,
        {
          $push: { likes: { user: req.user._id } },
        },
        {
          new: true,
        }
      ).exec((err, result) => {
        if (err) {
          return console.log(err);
        }
        // console.log(result)
      });
      return
    }
    Post.findByIdAndUpdate(req.params.id, {
      $pull: { likes: { user: req.user._id } },
    },
    {
      new: true,
    }).exec((err, result) => {
      if (err) {
        return console.log(err);
    //   console.log(result)
    }});
  }

module.exports = { Like };
