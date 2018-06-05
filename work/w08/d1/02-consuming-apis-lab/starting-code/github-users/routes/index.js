var express = require('express');
var router = express.Router();
var request = require('request');

const rootURL = 'https://api.github.com/';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {userData: null});
});

router.post('/', function(req, res) {
  var options = {
    url: rootURL + 'users/' + req.body.username,
    headers: {
      'User-Agent': 'jim-clark',
      'Authorization': 'token ' + process.env.GITHUB_TOKEN
    }
  };
  request(options, function(err, response, body) {
    var userData = JSON.parse(body);
    // update the options url to fetch the user's repos
    options.url = userData.repos_url;
    request(options, function(err, response, body) {
      // add a repos property
      userData.repos = JSON.parse(body);
      res.render('index', {userData: userData});
    });
  });
});

module.exports = router;
