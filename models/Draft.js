const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const draftSchema = new Schema({
  draftName: String,
  draftBody: String,
  draftAuthorId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = {
	Draft: mongoose.model("drafts", draftSchema),
};
