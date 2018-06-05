// Require modules
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Create the Express app
var app = express();

// Route modules
var indexRoutes = require('./routes/index');
var todosRoutes = require('./routes/todos')(app);

// Configure the app (app.set)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.locals.title = 'First Express';
app.locals.todos = require('./data/todos');

// Use middleware (app.use)
app.use(function(req, res, next) {
  console.log(req.headers['user-agent']);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Use routes
app.use('/', indexRoutes);
app.use('/todos', todosRoutes);

// Tell the app to listen on port 3000
app.listen(3000, function() {
  console.log('Listening on port 3000');
});