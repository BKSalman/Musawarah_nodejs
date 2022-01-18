const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const categorySchema = new Schema({
  name: { type: String },
});

module.exports = {
  Category: mongoose.model("categories", categorySchema),
};
