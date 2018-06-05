const express = require('express');
const router = express.Router();
const postsController = require('./../controllers/postsController');

router.post('/:user_id/posts', postsController.create);
router.delete('/:user_id/posts/:post_id', postsController.destroy);

module.exports = router;
