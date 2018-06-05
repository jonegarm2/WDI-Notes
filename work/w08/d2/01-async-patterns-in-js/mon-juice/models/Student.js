const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: String,
    age: Number,
    grade: String
    }, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
