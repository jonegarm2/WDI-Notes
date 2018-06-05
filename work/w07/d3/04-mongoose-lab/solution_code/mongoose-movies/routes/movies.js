var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/movies');

router.get('/', moviesCtrl.index); 
router.get('/new', moviesCtrl.new);
router.post('/', moviesCtrl.create);
router.get('/:id/edit', moviesCtrl.edit);
router.put('/:id', moviesCtrl.update);
router.delete('/:id', moviesCtrl.remove);

module.exports = router;
