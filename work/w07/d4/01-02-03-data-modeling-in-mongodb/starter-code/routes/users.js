const express = require('express');
const router = express.Router();
const usersController = require('./../controllers/usersController');

router.get('/new', usersController.new);
router.post('/', usersController.create);
router.get('/:id', usersController.show);

module.exports = router;
