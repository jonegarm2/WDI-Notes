const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: String,
    age: Number,
    class: String,
    students: [{type: Schema.Types.ObjectId, ref: 'Student'}]
    }, {
    timestamps: true
});

module.exports = mongoose.model('Teacher', teacherSchema);