const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");
const { User } = require("../models/User");

const newPost = async (req, res) => {
  try {
    const title = req.body.postTitle;
    const author = req.user.id;
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
  const date = new Date(post.createdAt);
  const postDate = date.toDateString();
  const postAuthor = await User.findById(post.postAuthor).exec();
  const postLikers = await User.find({ id: postLikes });
  let comments = undefined;
  if (post.postComments) {
    comments = await Comment.find({postId: post.id}).exec()
  }
  if (req.user && postLikes.includes(req.user.id)) {
    const like = true;
    return res.render("post-details", {
      post: post,
      postDate: postDate,
      postAuthor: postAuthor,
      user: user,
      like: like,
      postLikers: postLikers,
      postLikes: postLikes,
      comments: comments,
    });
  } else {
    const like = false;
    res.render("post-details", {
      post: post,
      postDate: postDate,
      postAuthor: postAuthor,
      user: user,
      like: like,
      postLikers: postLikers,
      postLikes: postLikes,
      comments: comments,
    });
  }

};

const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
};

const commentGET = async (req, res) => {
  const post = await Post.findOne({ id: req.params.id });
  if (post.postComments) {
    const comments = await Comment.find({postId: post.id}).exec()
    return res.render("comment-form", { post: post, comments: comments });
  }
  const comments = undefined;
  res.render("comment-form", { post: post, comments: comments });
};

const commentPOST = async (req, res) => {
  const postId = req.params.id;
  if (req.user) {
    const user = req.user;
    if (req.body.commentBody !== "") {
    if(req.file){
      const comment = new Comment({
        postId: postId,
        commentAuthorId: user.id,
        commentBody: req.body.comment,
        commentImage: req.file.filename,
      });
      const resComment = await comment.save()
      await Post.findOneAndUpdate(
        {id: postId},
        { $push: { postComments: resComment.id } }
        ).exec()
      return res.redirect(`/post/s/${postId}`);
    }
    const comment = new Comment({
      postId: postId,
      commentAuthorId: user.id,
      commentBody: req.body.comment,
    });
    const resComment = await comment.save()
    await Post.findOneAndUpdate(
      {id: postId},
      { $push: { postComments: resComment.id } }
      ).exec()
    res.redirect(`/post/s/${postId}`);
    
  } else {
    if(req.file){
      const comment = new Comment({
        postId: postId,
        commentAuthorId: user.id,
        commentImage: req.file.filename,
      });
      const resComment = await comment.save()
      await Post.findOneAndUpdate(
        {id: postId},
        { $push: { postComments: resComment.id } }
        ).exec()
      return res.redirect(`/post/s/${postId}`);
    }
    res.redirect(`/post/s/${postId}`);
  }
  
  }

};

module.exports = { newPost, postDetails, deletePost, commentGET, commentPOST };
