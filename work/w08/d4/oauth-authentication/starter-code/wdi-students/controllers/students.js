var Student = require('../models/student');

module.exports = {
  index: index
};

function index(req, res) {
  Student.find({}, function(err, students) {
    if (err) return res.status(err.statusCode || 500).json(err);
    res.json(students);
  });
}
