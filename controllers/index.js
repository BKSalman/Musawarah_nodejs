const { Post } = require("../models/Post");

const homePosts = async (req, res) => {
  const posts = await Post.find({});
  return res.render("home", { posts: posts });
};

module.exports = { homePosts };
