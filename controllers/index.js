const { Post } = require("../models/Post");

const homePosts = async (req, res) => {
  const posts = await Post.find({});
  res.render("home", { posts: posts });
};

module.exports = { homePosts };
