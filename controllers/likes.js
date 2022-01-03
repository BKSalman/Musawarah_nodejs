const { Post } = require("../models/Post");

const Like = async (req, res, next) => {
  if (!res.locals.isLoggedIn) {
    return res.json({ isLoggedIn: !res.locals.isLoggedIn });
  }
  const action = req.body.action;
  const post = await Post.findById(req.params.id).exec();
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
    res.locals.like = true
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

// const Unlike = async (req, res) => {
//   Post.findByIdAndUpdate(req.body.postId, {
//     $pull: { likes: { user: req.user._id } },
//   }).exec((err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });
// };

module.exports = { Like };
