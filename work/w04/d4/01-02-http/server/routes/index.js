var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cats', function(req, res) {
	res.json({cat: "cute", dogs: "cuter" })
})

module.exports = router;
