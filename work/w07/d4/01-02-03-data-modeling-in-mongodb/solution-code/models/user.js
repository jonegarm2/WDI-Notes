const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const PostSchema = require('./post.js')

const UserSchema = new Schema({
    name: String, 
    age: Number, 
    posts: [ PostSchema ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);