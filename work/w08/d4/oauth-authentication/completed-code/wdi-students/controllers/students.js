var Student = require('../models/student');

module.exports = {
  index,
  cohort
};

function index(req, res) {
  Student.find({}, function(err, students) {
    if (err) return res.status(err.statusCode || 500).json(err);
    res.json(students);
  });
}

function cohort(req, res) {
  req.user.cohort = req.body.cohort;
  req.user.save(function (err) {
    res.json(req.user);
  });
}
