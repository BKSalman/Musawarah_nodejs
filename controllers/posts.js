const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");
const { Category } = require("../models/Category");
const { User } = require("../models/User");

const postForm = async (req, res) => {
	const categories = await Category.find()
	res.render("post-form", {categories});
  }

const newPost = async (req, res) => {
  try {
    const title = req.body.postTitle;
    const author = req.user.id;
    const image = req.file.filename;
	const desc = req.body.postDesc;
	const categories = req.body.postCategories;
    const post = new Post({
      postTitle: title,
      postAuthor: author,
      postDesc: desc,
      postImage: image,
	  postCategories: categories,
    });
    await post.save();
    return res.redirect(`/`);
  } catch (err) {
    console.log(err);
    return res.redirect(`/`);
  }
};

const postDetails = async (req, res) => {
	const post = await Post.findById(req.params.id)
	.populate("postAuthor")
	.populate("likes.user")
	const user = req.user;
	let Liked = false
	let fav = false
	const postLikes = post.likes.map((Likes) => {
		return Likes.user;
	});
	const date = new Date(post.createdAt);
	const postDate = date.toDateString();
	// const postAuthor = await User.findById(post.postAuthor).exec()
	// const postLikers = await User.find({ id: postLikes }) 
	let comments = undefined;
	if (post.postComments) {
		comments = await Comment.find({postId: post.id}).populate("commentAuthorId").exec()
	}
  	for(const postLike of postLikes){
		if(user && postLike.id === user.id){
			Liked = true
			break
		} else {
			Liked = false
		}
    }
	if(user){
		const favposts = user.favoritePosts
		for(const favpost of favposts){
			if(favpost == post.id){
				fav = true
				break
			} else {
				fav = false
			}
		}
	}
	
	return res.render("post-details", {
	post: post,
	postDate: postDate,
	user: user,
	like: Liked,
	fav: fav,
	postLikes: postLikes,
	comments: comments,
	});
};

const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  return res.redirect("/");
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
	  return res.redirect(`/post/s/${postId}`);
    
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
    return res.redirect(`/post/s/${postId}`);
  }
  
  }

};

const favPost = async (req, res) =>{
	const postId = req.params.id
	const action = req.body.action
	if(action === "Fav"){
		await User.findByIdAndUpdate(
			req.user.id,
			{
				$push:{
					favoritePosts: postId
				}
			}).catch(err => console.log(err))
			return
	}
		await User.findByIdAndUpdate(
			req.user.id,
			{
				$pull:{
					favoritePosts: postId
				}
			}).catch(err => console.log(err))
}

module.exports = { 
		newPost,
		postDetails,
		deletePost,
		commentPOST,
		postForm,
		favPost 
	};
