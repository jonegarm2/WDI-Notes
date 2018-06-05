var router = require('express').Router();
var studentsCtrl = require('../controllers/students');
var factsCtrl = require('../controllers/facts');

// GET /api/students
router.get('/students', studentsCtrl.index);

/*-------------------------------------------------------
ReSTful routes for: facts:

  Despite the fact that we don't have a 'facts' collection,
  we still need routes that map to their creation and
  removal.

  GET: Not needed / facts are fetched with each student
  POST: Creates a new fact for the currently
        authenticated student.
  DELETE: Deletes the fact with the :id param.
  PUT: Not used in this app.
-------------------------------------------------------*/

// POST /api/facts
router.post('/facts', factsCtrl.create);

// DELETE /api/facts/:id
router.delete('/facts/:id', factsCtrl.delete);

module.exports = router;
