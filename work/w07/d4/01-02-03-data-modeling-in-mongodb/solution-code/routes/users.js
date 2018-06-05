const express = require('express');
const router = express.Router();
const usersController = require('./../controllers/usersController');

router.get('/', usersController.index);
router.get('/new', usersController.newUser);
router.post('/', usersController.create);
router.get('/:id', usersController.show);

module.exports = router;
