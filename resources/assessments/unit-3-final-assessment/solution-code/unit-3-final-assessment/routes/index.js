var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/posts', function(req, res, next) {
  request('https://jsonplaceholder.typicode.com/posts', function(err, response, body) {
    res.render('posts', {posts: JSON.parse(body)});
  })
});

module.exports = router;
