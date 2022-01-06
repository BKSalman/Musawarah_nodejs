const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const postSchema = new Schema({
  postTitle: { type: String, required: true },
  postAuthor: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  postCategories: [
    {
      type: Schema.Types.String,
      ref: "categories",
    },
  ],
  postComments: [
    {
      type: Schema.Types.String,
      ref: "comments",
    },
  ],
  likes: [
    {
      user:{
      type: Schema.Types.String,
      ref: "users",
    },
    createdAt: { type: Date, default: Date.now }
  }
  ],
  postTags: Array,
  postImage: String,
  postDesc: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = {
  Post: mongoose.model("posts", postSchema),
};
