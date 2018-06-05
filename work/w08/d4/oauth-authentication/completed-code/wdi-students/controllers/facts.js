var Student = require('../models/student');

module.exports = {
  create: create,
  delete: del
};

function create(req, res) {
  req.user.facts.push({text: req.body.fact});
  req.user.save(function(err) {
    res.json(req.user);
  });
}

function del(req, res) {
  req.user.facts.remove(req.params.id);
  req.user.save(function(err) {
    res.json({msg: 'deleted fact'});
  });
}
