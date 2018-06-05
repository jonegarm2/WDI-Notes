var Movie = require('../models/movie');

module.exports = {
  index: index,
  new: newMovie,
  create: create,
  edit: edit,
  update: update,
  remove: remove
};

function index(req, res) {
  Movie.find({}, function(err, movies) {
    res.render('movies/index', {movies});
  });
}

function newMovie(req, res) {
  res.render('movies/new', {movie: {}});
}

function create(req, res) {
  // if nowShowing checkbox not checked...
  req.body.nowShowing = !!req.body.nowShowing;
  // remove whitespace next to commas
  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
  // split if it's not an empty string
  if (req.body.cast) req.body.cast = req.body.cast.split(',');
  // remove empty properties
  for (var key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  var movie = new Movie(req.body);
  movie.save(function(err) {
    // one way to handle errors
    if (err) return res.render('movies/new');
    console.log(movie);
    // for now, redirect right back to new.ejs
    res.redirect('/movies/new');
  });
}

function edit(req, res, next) {
  Movie.findById(req.params.id, function(err, movie) {
    // this way of handling errors triggers the error handlers
    // defined near the bottom of server.js
    if (err) return next(err);
    // the object below is using object shorthand property syntax
    res.render('movies/edit', {movie});
  });
}

function update(req, res) {
  if (!req.body.nowShowing) req.body.nowShowing = false;
  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
  if (req.body.cast) req.body.cast = req.body.cast.split(',');
  Movie.findByIdAndUpdate(req.params.id, req.body, function(err, movie) {
    if (err) return res.render('movies/' + req.params.id + '/edit');
    res.redirect('/movies');
  });
}

function remove(req, res) {
  Movie.findByIdAndRemove(req.params.id, function(err) {
    res.redirect('/movies');
  });
}
