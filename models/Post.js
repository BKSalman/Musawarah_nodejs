const mongoose = require('mongoose'),
    { Schema } = require('mongoose');

const postSchema = new Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    medium: String,
    image: String,
    description: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = {
    Post: mongoose.model('posts', postSchema)
 };
