const { Post } = require("../models/Post");
const { Date } = require("../utils");

const homePosts = async (req, res) => {
  const date = new Date();
  const posts = await Post.find({});
  const sortedPosts = await Post.aggregate([
    {
      $match: {
        $or: [
          { createdAt: { $gt: date.subtractDays(7) } },
          { createdAt: { $gt: date.subtractDays(30) } },
        ],
      },
    },
    {
      $project: {
        _Id: 1,
        postImage: 1,
        likesCount: { $size: "$likes" },
      },
    },
    {
      $sort: { likesCount: -1 },
    },
  ]);
  return res.render("home", { posts: posts, sortedPosts });
};

module.exports = { homePosts };
