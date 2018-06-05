var Beer = require('../models/beer');

function index(req, res) {
  Beer.find({}, (err, beers) => {
    res.render('beers/index', {pageTitle: 'BEER LIST', beers});
  });
}

function show(req, res) {
  Beer.findById(req.params.id).populate('bars').exec((err, beer) => {
    res.render('beers/show', {pageTitle: 'BEER: ' + beer.name, beer});
  });
}

function deleteBeer(req, res) {
  Beer.findById(req.params.id, (err, beer) => {
    beer.remove();
    res.redirect('/beers');
  });
}

function newBeer(req, res) {
  res.render('beers/new', {pageTitle: 'NEW BEER'});
}

function create(req, res) {
  var beer = new Beer(req.body);
  beer.save(err => {
    res.redirect(`/beers/${beer.id}`);
  });
}

function createComment(req, res) {
  Beer.findById(req.params.id).exec((err, beer) => {
    beer.comments.push({content: req.body.content});
    beer.save(err => {
      res.redirect(`/beers/${beer.id}`);
    });
  });
}

module.exports = {
  index,
  show,
  delete: deleteBeer,
  new: newBeer,
  create,
  createComment
}