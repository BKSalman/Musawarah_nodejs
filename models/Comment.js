const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const commentSchema = new Schema({
  commentAuthorId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "posts",
  },
  commentBody: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = {
  Post: mongoose.model("comments", commentSchema),
};
