var express = require('express');
var router = express.Router();
var todos = require('../data/todos');

module.exports = function(app) {

  // get '/todos'
  router.get('/', function(req, res) {
    res.render('todos/index');
  });

  // post '/todos'
  router.post('/', function(req, res) {
    todos.push({
      todo: req.body.newTodo,
      done: false
    });
    res.render('todos/index');
  });

  return router;
};