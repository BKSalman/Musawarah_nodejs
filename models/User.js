const mongoose = require('mongoose'),
    { Schema } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique : true},
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique : true},
    password:{type: String,
        required: true},
    is_staff: {
        type: Boolean,
        default:false},
    is_active: {
        type: Boolean,
        default:true},
    date_joined: {
        type: Date,
        default: Date.now}
});

module.exports = {
    User: mongoose.model('users', userSchema)
 };
