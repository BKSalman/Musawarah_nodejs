const { Post } = require("../models/Post");
const { User } = require("../models/User");

const isOwner = async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    const postAuthor = await User.findById(post.postAuthor).exec();
    console.log(postAuthor.id);
    console.log(req.user.id);
    if (post && req.user && req.user.id == postAuthor.id){
      console.log(post.postAuthor);
        next()
    }
  };

module.exports = {isOwner}