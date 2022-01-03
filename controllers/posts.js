const { Post } = require("../models/Post");
const { User } = require("../models/User");

const newPost = async (req, res) => {
  try {
    const title = req.body.postTitle;
    const author = req.user._id;
    const image = req.file.filename;
    const desc = req.body.postDesc;
    const post = new Post({
      postTitle: title,
      postAuthor: author,
      postDesc: desc,
      postImage: image,
    });
    await post.save();
    res.redirect(`/`);
  } catch (err) {
    console.log(err);
    res.redirect(`/`);
  }
};

const postDetails = async (req, res) => {
  const post = await Post.findById(req.params.id);
  user = req.user;
  const postLikes = post.likes.map((Likes) => {
    return Likes.user;
  });
  const postAuthor = await User.findById(post.postAuthor).exec();
  if (req.user && postLikes.includes(req.user.id)) {
    const like = true;
    return res.render("post-details", {
      post: post,
      postAuthor: postAuthor,
      user: user,
      like: like,
    });
  } else {
    const like = false;
    res.render("post-details", {
      post: post,
      postAuthor: postAuthor,
      user: user,
      like: like,
    });
  }
};

const deletePost = async (req, res) => {
  console.log(req.params.id);
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
};

module.exports = { newPost, postDetails, deletePost };
