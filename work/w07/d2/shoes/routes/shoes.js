const express = require('express');
const router = express.Router();
const shoes = require('./../controllers/shoesController');

router.get('/', shoes.index);
router.get('/new', shoes.new);
router.get('/:id',shoes.show);
router.post('/', shoes.create);
router.delete('/:id', shoes.destroy);
router.get('/:id/edit', shoes.edit);
router.put('/:id', shoes.update);

module.exports = router;