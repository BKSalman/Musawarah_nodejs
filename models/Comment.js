const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const commentSchema = new Schema({
  postId: {
    type: Schema.Types.String,
    ref: "posts",
  },

  commentAuthorId: {
    type: Schema.Types.String,
    ref: "users",
  },  

  commentBody: String,
  
  commentImage: String,

  createdAt: { type: Date, default: Date.now },
});

module.exports = {
  Comment: mongoose.model("comments", commentSchema),
};
