var express = require('express');
var router = express.Router();
var topscoresCtrl = require('../../controllers/topscores');

/*---------- Protected Routes ----------*/

router.get('/', checkAuth, topscoresCtrl.index);


/*----- Helper Functions -----*/

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'not authenticated'});
}

module.exports = router;