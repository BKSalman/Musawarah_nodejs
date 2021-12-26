const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const postSchema = new Schema({
  postTitle: { type: String, required: true },
  postAuthor: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
  ],
  postComments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  likes: [
    {
      username: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  postTags: Array,
  image: String,
  desc: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = {
  Post: mongoose.model("posts", postSchema),
};
