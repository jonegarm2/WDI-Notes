var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('home', {pageTitle: 'Welcome to the Thirsty Mongoose!'});
});

module.exports = router;
