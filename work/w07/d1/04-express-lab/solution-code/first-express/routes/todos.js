var express = require('express');
var router = express.Router();
var todos = require('../data/todos');

// get '/todos'
router.get('/', function(req, res) {
  res.render('todos/index', { todos /* ES2015 shortcut prop syntax*/});
});

// get a single todo
router.get('/:id', function(req, res) {
  var todo = todos[req.params.id];
  res.render('todos/show', {id: req.params.id, todo: todo})
});

// post '/todos'
router.post('/', function(req, res) {
  todos.push({
    todo: req.body.newTodo,
    done: false
  });
  res.render('todos/index', { todos });
});

// delete '/todos/:id'
router.delete('/:id', function(req, res) {
  todos.splice(req.params.id, 1);
  res.render('todos/index', { todos });
});

// put '/todos/:id'
router.put('/:id', function(req, res) {
  todos[req.params.id].todo = req.body.todo;
  res.render('todos/index', { todos });
})

module.exports = router;

