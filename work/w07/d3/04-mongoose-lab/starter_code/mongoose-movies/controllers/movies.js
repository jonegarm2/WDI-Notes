var Movie = require('../models/movie');

module.exports = {
  index: index,
  new: newMovie,
  create: create
};

function index(req, res) {
  Movie.find({}, function(err, movies) {
    res.render('movies/index', {movies: movies});
  });
}

function newMovie(req, res) {
  res.render('movies/new.ejs');
}

function create(req, res) {
  // if nowShowing checkbox not checked...
  if (!req.body.nowShowing) req.body.nowShowing = false;
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
