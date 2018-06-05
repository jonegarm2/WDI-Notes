var express = require('express');
var router = express.Router();
var barsCtrl = require('../controllers/bars');

router.get('/', barsCtrl.index);
router.get('/new', barsCtrl.new);
router.get('/:id', barsCtrl.show);
router.post('/', barsCtrl.create);
router.delete('/:id', barsCtrl.delete);
router.get('/:id/beers/new', barsCtrl.newServe);
router.post('/:barId/beers/:beerId', barsCtrl.createServe);
router.delete('/:barId/beers/:beerId', barsCtrl.deleteServe);

module.exports = router;
