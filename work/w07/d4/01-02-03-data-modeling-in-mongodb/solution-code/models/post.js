const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({ 
    content: String, 
    category: {
        type: String, 
        enum: [ "Cats", "Dogs", "#fitzpo"]
    }
}, {
    timestamps: true
})

module.exports = PostSchema;